const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const port = 3000;
const wsPort = 3001;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Hot reload script to inject into HTML
const hotReloadScript = `
<script>
  const ws = new WebSocket('ws://localhost:${wsPort}');
  ws.onmessage = function(event) {
    if (event.data === 'reload') {
      location.reload();
    }
  };
  ws.onopen = function() {
    console.log('Hot reload connected');
  };
  ws.onclose = function() {
    console.log('Hot reload disconnected');
  };
</script>
`;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      
      // Inject hot reload script into HTML files
      if (extname === '.html') {
        const htmlContent = content.toString();
        const modifiedContent = htmlContent.replace('</body>', `${hotReloadScript}</body>`);
        res.end(modifiedContent, 'utf-8');
      } else {
        res.end(content, 'utf-8');
      }
    }
  });
});

// WebSocket server for hot reload
const wss = new WebSocketServer({ port: wsPort });

// Watch for file changes
const watchedFiles = ['index.html', 'styles.css', 'index.js'];
const watchers = [];

watchedFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  const watcher = fs.watchFile(filePath, (curr, prev) => {
    console.log(`${fileName} changed, reloading...`);
    // Send reload message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send('reload');
      }
    });
  });
  watchers.push(watcher);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`WebSocket server running on port ${wsPort}`);
  console.log('Hot reload enabled - changes to HTML, CSS, and JS files will auto-refresh the browser');
});

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  watchers.forEach(watcher => {
    fs.unwatchFile(watcher);
  });
  process.exit();
});
