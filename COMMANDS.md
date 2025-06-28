# Примеры команд для работы с тестами

## Локальный запуск тестов

```bash
# Запуск всех тестов с Allure отчетом
npm run test:allure

# Запуск тестов в CI режиме
npm run test:allure:ci

# Запуск тестов в DEV режиме (для отладки)
npm run test:allure:dev
```

## Работа с отчетами

```bash
# Очистка результатов
npm run allure:clean

# Генерация отчета из существующих результатов
npm run allure:generate

# Открытие отчета в браузере
npm run allure:open

# Полный цикл: очистка → тесты → отчет → просмотр
npm run allure:clean && npm run test:allure && npm run allure:open
```

## Запуск тестов по тегам

```bash
# Дымовые тесты
npm run test:smoke

# Регрессионные тесты
npm run test:regression

# Высокоприоритетные тесты
npm run test:priority-high

# Тесты средней приоритетности
npm run test:priority-medium

# Тесты элементов
npm run test:elements

# Комбинированные теги
cucumber-js --tags "@smoke and @priority-high"
cucumber-js --tags "@regression and not @debug"
cucumber-js --tags "@priority-high or @priority-medium"
```

## CI/CD команды

```bash
# Команда для CI окружения
cross-env TEST_MODE=ci cucumber-js

# Команда для CI с конкретными тегами
cross-env TEST_MODE=ci cucumber-js --tags "@smoke"

# Команда для генерации отчета в CI
allure generate allure-results -o allure-report --clean
```

## Полезные скрипты

```bash
# Использование готового скрипта (если сделали исполняемым)
./test-and-view-report.sh              # Все тесты
./test-and-view-report.sh "@smoke"     # Только smoke тесты
./test-and-view-report.sh "@elements"  # Только тесты элементов
```

## Отладка и проверка

```bash
# Проверка установки Playwright
npx playwright install --with-deps chromium

# Проверка конфигурации Cucumber
npx cucumber-js --dry-run

# Проверка TypeScript
npx tsc --noEmit

# Просмотр доступных npm скриптов
npm run
```

## GitHub Actions

```bash
# Команды, которые выполняются в GitHub Actions:

# Установка зависимостей
npm ci

# Установка браузеров Playwright
npx playwright install --with-deps chromium

# Запуск тестов в CI режиме
npm run test:ci

# Генерация Allure отчета
npm run allure:generate
```

## Мониторинг и анализ

```bash
# Просмотр структуры проекта
tree -I 'node_modules|allure-results|allure-report'

# Просмотр логов последнего выполнения
ls -la allure-results/

# Проверка размера отчетов
du -sh allure-report/
du -sh allure-results/
```
