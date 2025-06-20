# Pomodoro Timer Settings

Інтерактивний інтерфейс налаштувань для Pomodoro таймера з анімованими слайдерами та ефектом rolling counter.

## ✨ Особливості

- **Анімовані слайдери** з динамічним відображенням значень
- **Rolling Counter анімація** - числа прокручуються як механічні лічильники
- **Responsive дизайн** з сучасним UI
- **Hot reload** для розробки
- **Модульна архітектура** з розділеними компонентами

## 🏗️ Структура проекту

```
├── src/
│   ├── components/
│   │   ├── rolling-counter.js          # Компонент анімованого лічильника
│   │   └── pomodoro-slider-controller.js # Контролер для слайдерів
│   ├── styles/
│   │   └── main.css                    # Основні стилі
│   └── assets/
│       └── screenshot.png              # Скриншот проекту
├── pomodoro-settings.html              # Головна сторінка
├── server.js                           # Сервер розробки з hot reload
└── package.json                        # Конфігурація проекту
```

## 🚀 Запуск проекту

1. Встановіть залежності:
   ```bash
   npm install
   ```

2. Запустіть сервер розробки:
   ```bash
   npm start
   ```

3. Відкрийте http://localhost:3000 у браузері

## 🎛️ Налаштування

Проект включає 4 слайдери для налаштування Pomodoro таймера:

- **Focus duration** (5-60 хв) - тривалість робочої сесії
- **Short break duration** (1-30 хв) - коротка перерва
- **Long break duration** (1-45 хв) - довга перерва
- **Rounds** (2-15) - кількість циклів

## 🎨 Компоненти

### RollingCounter
Компонент для анімованого відображення чисел з ефектом "барабану":
- Динамічна ширина контейнера
- Приховування ведучих нулів
- Плавна анімація прокручування цифр

### PomodoroSliderController
Контролер для керування слайдерами:
- Автоматичний розрахунок позиції
- Адаптивна ширина відображення
- Інтеграція з RollingCounter

## 🔧 Технології

- Vanilla JavaScript (ES6+)
- CSS3 з кастомними властивостями
- WebSocket для hot reload
- Node.js сервер

## 📱 Сумісність

Проект підтримує всі сучасні браузери та адаптивний дизайн для мобільних пристроїв.
