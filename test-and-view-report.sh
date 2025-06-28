#!/bin/bash

# Скрипт для локального тестирования и просмотра Allure отчетов
# Использование: ./test-and-view-report.sh [тег]

set -e

echo "🧪 Запуск тестов DemoQA с Allure отчетом..."

# Очистка предыдущих результатов
echo "🧹 Очистка предыдущих результатов..."
npm run allure:clean

# Определение режима запуска
if [ $# -eq 0 ]; then
    echo "🏃 Запуск всех тестов..."
    npm run test:allure:dev
else
    echo "🏃 Запуск тестов с тегом: $1"
    npx cross-env TEST_MODE=dev cucumber-js --tags "$1"
fi

# Генерация отчета
echo "📊 Генерация Allure отчета..."
npm run allure:generate

# Открытие отчета в браузере
echo "🌐 Открытие отчета в браузере..."
npm run allure:open

echo "✅ Готово! Отчет открыт в вашем браузере."
