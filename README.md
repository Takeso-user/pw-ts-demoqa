# Тестирование Web-элементов на DemoQA.com

Этот проект представляет собой автоматизацию тестирования веб-элементов на сайте [DemoQA Elements](https://demoqa.com/elements) с использованием TypeScript, Playwright и Cucumber.

## Структура проекта

```
├── cucumber.js          # Конфигурация Cucumber
├── package.json         # Зависимости и скрипты npm
├── tsconfig.json        # Конфигурация TypeScript
└── src/
    ├── features/        # Cucumber фичи (BDD спецификации)
    ├── pages/           # Классы Page Object Model
    ├── step_definitions/# Шаги для Cucumber фич
    └── support/         # Вспомогательные файлы
```

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:

```bash
npm install
```

3. Установите браузеры для Playwright:

```bash
npx playwright install
```

## Запуск тестов

### Запуск всех тестов

```bash
npm test
```

### Запуск конкретных тестов

- Тестирование Text Box:

```bash
npm run test:text-box
```

- Тестирование Check Box:

```bash
npm run test:check-box
```

- Тестирование Radio Button:

```bash
npm run test:radio-button
```

### Генерация отчета

```bash
npm run report
```

После запуска в корневой директории проекта будет создан файл `cucumber-report.html` с отчетом о выполнении тестов.

## Реализованные тесты

1. **Text Box**

   - Заполнение всех полей формы и проверка результатов
   - Проверка валидации email

2. **Check Box**

   - Выбор основного чекбокса "Home" и проверка выбора дочерних элементов
   - Выбор отдельных чекбоксов и проверка результатов

3. **Radio Button**
   - Выбор радиокнопок "Yes" и "Impressive" и проверка результатов
   - Проверка состояния отключенной радиокнопки "No"

## Расширение тестов

Для добавления новых тестов:

1. Создайте новый .feature файл в директории `src/features/`
2. Реализуйте соответствующие шаги в `src/step_definitions/`
3. При необходимости, создайте или расширьте классы Page Object в `src/pages/`
