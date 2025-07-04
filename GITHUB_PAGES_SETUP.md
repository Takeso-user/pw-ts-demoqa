# Настройка GitHub Pages для Allure отчетов

## Быстрая настройка

### 1. Активация GitHub Pages

1. Перейдите в настройки вашего репозитория: `Settings` → `Pages`
2. В разделе **Source** выберите **GitHub Actions**
3. Сохраните настройки

### 2. Первый запуск тестов

1. Сделайте push в `main` или `master` ветку
2. Дождитесь завершения GitHub Actions workflow
3. Ваш отчет будет доступен по адресу: `https://[ваш-username].github.io/[название-репозитория]/`

### 3. Ручной запуск тестов

1. Перейдите в раздел `Actions` в вашем репозитории
2. Выберите workflow **DemoQA Tests CI/CD**
3. Нажмите **Run workflow**
4. Опционально: укажите теги для запуска (например, `@smoke`, `@regression`)
5. Нажмите **Run workflow**

## Что происходит автоматически

### При каждом push в main/master:

- ✅ Запускаются все тесты
- ✅ Генерируется Allure отчет
- ✅ Отчет публикуется на GitHub Pages
- ✅ Создаются артефакты для скачивания

### При создании Pull Request:

- ✅ Запускаются тесты
- ✅ Создаются артефакты
- ❌ НЕ публикуется на GitHub Pages (только для основной ветки)

## Структура отчета

Ваш Allure отчет будет содержать:

- 📊 **Overview**: Общая статистика тестов
- 📋 **Suites**: Тесты, сгруппированные по функциональности
- 📈 **Graphs**: Графики и диаграммы
- 🏷️ **Tags**: Фильтрация по тегам
- 📸 **Screenshots**: Скриншоты при ошибках
- 📝 **Logs**: Подробные логи выполнения
- 📊 **Timeline**: Временная шкала выполнения тестов

## Полезные команды

```bash
# Локальный запуск с генерацией отчета
npm run test:allure

# Просмотр отчета локально
npm run allure:open

# Очистка предыдущих результатов
npm run allure:clean

# Только генерация отчета (если есть результаты)
npm run allure:generate
```

## Troubleshooting

### Отчет не отображается на GitHub Pages

1. Проверьте, что GitHub Pages активированы с источником "GitHub Actions"
2. Убедитесь, что workflow завершился успешно (без ошибок)
3. Подождите несколько минут после завершения деплоя

### Тесты не запускаются

1. Проверьте, что push был в правильную ветку (main/master)
2. Убедитесь, что файл `.github/workflows/ci.yml` существует
3. Проверьте логи GitHub Actions для выявления ошибок

### Нет скриншотов в отчете

Скриншоты создаются только при падении тестов. Если все тесты проходят успешно, скриншотов не будет.

## Дополнительные возможности

### Запуск конкретных тестов

Используйте теги Cucumber для запуска только нужных тестов:

```bash
# Примеры тегов
@smoke           # Дымовые тесты
- @regression      # Регрессионные тесты
@priority-high   # Высокоприоритетные тесты
@elements        # Тесты элементов
```

### История выполнения

Allure автоматически ведет историю выполнения тестов, показывая тренды стабильности и производительности.
