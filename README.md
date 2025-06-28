# Web Elements Testing on DemoQA.com

This project represents an automation testing framework for web elements on [DemoQA Elements](https://demoqa.com/elements) using TypeScript, Playwright, and Cucumber for BDD approach implementation.

## Table of Contents

- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Allure Reporting](#allure-reporting)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Implemented Tests](#implemented-tests)
- [Extending Tests](#extending-tests)
- [Tagging System for Tests](#tagging-system-for-tests)
- [Technologies](#technologies)
- [License](#license)

## Requirements

- Node.js (version 14 or higher)
- npm (included with Node.js)
- Supported operating systems:
  - Windows 10/11
  - macOS 10.15 (Catalina) or newer
  - Ubuntu 20.04 or other Linux distributions

## Project Structure

```
├── allure.config.js     # Allure reporting configuration
├── cucumber.js          # Cucumber configuration
├── package.json         # Dependencies and npm scripts
├── tsconfig.json        # TypeScript configuration
├── downloads/           # Directory for downloaded files during testing
├── allure-results/      # Directory for Allure test execution results (generated)
├── allure-report/       # Directory for Allure HTML reports (generated)
└── src/
    ├── features/        # Cucumber features (BDD specifications)
    │   ├── text-box.feature
    │   ├── check-box.feature
    │   ├── radio-button.feature
    │   └── ...
    ├── pages/           # Page Object Model classes
    │   ├── BasePage.ts
    │   ├── TextBoxPage.ts
    │   └── ...
    ├── step_definitions/# Steps for Cucumber features
    │   ├── text-box.steps.ts
    │   └── ...
    └── support/         # Helper files
        ├── playwrightSetup.ts  # Playwright configuration
        └── world.ts            # World configuration for Cucumber
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Takeso-user/pw-ts-demoqa.git
cd pw-ts-demoqa
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run Modes

This project supports two test execution modes:

1. **CI/CD Mode** - Headless browser execution for continuous integration, optimized for speed and stability
2. **Development Mode** - Visual browser execution with slower speed for debugging and development

### Run all tests

```bash
# Default mode (CI/CD)
npm test

# CI/CD mode explicitly
npm run test:ci

# Development mode
npm run test:dev
```

### Run specific features

| Functionality | CI/CD Mode                     | Development Mode                |
| ------------- | ------------------------------ | ------------------------------- |
| Text Box      | `npm run test:ci:text-box`     | `npm run test:dev:text-box`     |
| Check Box     | `npm run test:ci:check-box`    | `npm run test:dev:check-box`    |
| Radio Button  | `npm run test:ci:radio-button` | `npm run test:dev:radio-button` |

### Run tests by tag

You can run tests selectively based on tags applied to features and scenarios:

```bash
# Run all smoke tests
npm run test:smoke

# Run all regression tests
npm run test:regression

# Run high priority tests
npm run test:priority-high

# Run medium priority tests
npm run test:priority-medium

# Run low priority tests
npm run test:priority-low

# Run form-related tests
npm run test:form

# Run checkbox-related tests
npm run test:checkbox

# Run tests with the debug tag
npm run test:debug

# Run tests that deliberately fail (for screenshot testing)
npm run test:fail

# Run screenshot-related tests
npm run test:screenshot

# Run smoke tests in CI mode
npm run test:ci:smoke

# Run smoke tests in development mode
npm run test:dev:smoke

# Generate Allure reports for smoke tests
npm run test:allure:smoke
```

### Using complex tag expressions

You can also run tests with complex tag expressions directly from the command line:

```bash
# Run tests that have both @smoke and @priority-high tags
npx cucumber-js --tags "@smoke and @priority-high"

# Run tests that have either @smoke or @regression tags
npx cucumber-js --tags "@smoke or @regression"

# Run all tests except screenshot tests
npx cucumber-js --tags "not @screenshot"

# Run form tests that are high priority
npx cucumber-js --tags "@form and @priority-high"
```

### Generate report

```bash
# Default report
npm run report

# CI/CD mode report
npm run report:ci

# Development mode report
npm run report:dev
```

After running, HTML reports will be created in the project root directory with the test execution results.

## Allure Reporting

This project is configured with Allure reporting to provide detailed and interactive test reports suitable for CI/CD environments like Jenkins and GitHub Actions.

### Running Tests with Allure

```bash
# Run all tests with Allure reporting
npm run test:allure

# Run tests with Allure reporting in CI mode
npm run test:allure:ci

# Run tests with Allure reporting in development mode
npm run test:allure:dev
```

### Working with Allure Reports

```bash
# Clean previous Allure results and reports
npm run allure:clean

# Generate Allure HTML report from results
npm run allure:generate

# Open the Allure report in your default browser
npm run allure:open
```

### GitHub Pages Integration

Тесты автоматически запускаются при push в main/master ветку, и Allure отчеты публикуются на GitHub Pages:

1. **Автоматическая публикация**: При каждом push в main/master ветку, тесты запускаются автоматически
2. **Доступ к отчету**: После успешного выполнения CI/CD, отчет будет доступен по адресу:
   ```
   https://[ваш-username].github.io/[название-репозитория]/
   ```
3. **Ручной запуск**: Вы можете запустить тесты вручную через GitHub Actions с конкретными тегами

### Jenkins Integration

For Jenkins integration:

1. Install the Allure Jenkins plugin
2. Configure your Jenkins job to run tests with `npm run test:allure:ci`
3. Configure the Allure plugin to use the `allure-results` directory
4. Add a post-build action to publish the Allure reports

Example Jenkins pipeline step:

```groovy
stage('Test') {
    steps {
        sh 'npm run test:allure:ci'
    }
    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
```

## CI/CD with GitHub Actions

This project is configured with GitHub Actions for continuous integration and continuous deployment. The workflow automates test execution and report generation whenever code is pushed to the main branch or a pull request is created.

### Workflow Configuration

The GitHub Actions workflow is defined in `.github/workflows/ci.yml` and includes the following features:

- **Automated Test Execution**: Runs smoke tests automatically on pushes and pull requests
- **Custom Test Execution**: Allows manual triggering with custom tag expressions
- **Report Generation**: Creates and publishes Allure reports
- **Artifact Storage**: Stores test reports and failure screenshots as GitHub artifacts
- **GitHub Pages Deployment**: Publishes Allure reports to GitHub Pages for easy access

### Running Tests Manually in GitHub Actions

You can manually trigger the workflow and specify which tests to run using the GitHub Actions UI:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "DemoQA Tests CI/CD" workflow
3. Click "Run workflow"
4. Optionally, enter a Cucumber tag expression (e.g., `@regression and @priority-high`)
5. Click "Run workflow" to start the tests

### Viewing Reports

После запуска тестов, вы можете просматривать отчеты несколькими способами:

1. **GitHub Pages (рекомендуется)**: 
   - Для push'ей в main/master ветку, Allure отчет автоматически публикуется на GitHub Pages
   - URL: `https://[ваш-username].github.io/[название-репозитория]/`
   - Отчет содержит интерактивные диаграммы, детали тестов, скриншоты и историю выполнения

2. **GitHub Actions Artifacts**: 
   - Каждый запуск workflow сохраняет следующие артефакты:
   - `allure-report`: Полный Allure HTML отчет
   - `cucumber-report`: Cucumber HTML отчет  
   - `screenshots`: Скриншоты при ошибках тестов (только при наличии ошибок)

3. **Локальный просмотр**:
   - Скачайте артефакт `allure-report` из GitHub Actions
   - Распакуйте и откройте `index.html` в браузере

### Настройка GitHub Pages

Для работы с GitHub Pages убедитесь, что в настройках репозитория:

1. Перейдите в Settings → Pages
2. В разделе "Source" выберите "GitHub Actions"
3. После первого успешного деплоя, ваш отчет будет доступен по указанному URL

### Local vs CI Execution

The CI/CD pipeline uses headless browsers in CI mode for efficient execution. When developing locally, you can still use the development mode for visual debugging as described in the [Running Tests](#running-tests) section.

## Implemented Tests

| Section                | Test Scenarios                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Text Box**           | • Filling all form fields and validating results<br>• Email validation                                                                  |
| **Check Box**          | • Selecting the main "Home" checkbox and verifying child elements selection<br>• Selecting individual checkboxes and validating results |
| **Radio Button**       | • Selecting "Yes" and "Impressive" radio buttons and validating results<br>• Verifying disabled state of the "No" radio button          |
| **Buttons**            | • Testing clicks: single, double, and right click                                                                                       |
| **Links**              | • Verifying functionality of different link types                                                                                       |
| **Broken Links**       | • Testing valid and broken links and images                                                                                             |
| **Upload Download**    | • Uploading a file to the server<br>• Downloading a file from the server                                                                |
| **Dynamic Properties** | • Verifying element properties that change over time                                                                                    |
| **Web Tables**         | • Adding new records<br>• Searching for records<br>• Editing records<br>• Deleting records                                              |

## Extending Tests

To add new tests:

1. Create a new .feature file in the `src/features/` directory using Gherkin language
2. Implement corresponding steps in `src/step_definitions/`
3. If necessary, create or extend Page Object classes in `src/pages/`

Example of creating a new test:

1. Create a file `src/features/new-feature.feature`:

```gherkin
Feature: New Functionality

  Scenario: Example scenario
    Given the user is on the elements page
    When they perform some action
    Then they see the expected result
```

2. Create a file `src/step_definitions/new-feature.steps.ts` with step implementations.

## Technologies

- **TypeScript**: Typed JavaScript for better development experience
- **Playwright**: Modern framework for web application testing automation
- **Cucumber**: BDD framework for writing tests in a human-readable format
- **Page Object Model**: Design pattern for organizing test code
- **Allure**: Framework for generating detailed test reports

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Tagging System for Tests

This project utilizes Cucumber tags to categorize and organize tests. Tags are applied at both feature and scenario levels to provide flexible test execution options.

### Tag Categories

| Category     | Tags                                                  | Description                                           |
| ------------ | ----------------------------------------------------- | ----------------------------------------------------- |
| **Priority** | `@priority-high`, `@priority-medium`, `@priority-low` | Test importance level for execution prioritization    |
| **Scope**    | `@smoke`, `@regression`                               | Test scope and purpose                                |
| **Type**     | `@positive`, `@negative`, `@validation`               | Type of test case                                     |
| **Feature**  | `@form`, `@checkbox`, `@elements`                     | Specific feature area or component being tested       |
| **Special**  | `@debug`, `@screenshot`, `@fail`                      | Special purposes like debugging or screenshot testing |

### Tag Usage in Feature Files

Tags are added at the feature level to categorize all scenarios in that feature:

```gherkin
@form @elements @regression
Feature: TextBox Elements
    As a user of demoqa.com website
    I want to test the functionality of text fields
    So that I can ensure they work correctly
```

Tags can also be added to individual scenarios for more precise categorization:

```gherkin
@positive @smoke @priority-high
Scenario: Fill and submit form with text fields
    Given I open the Text Box page
    When I fill the Full Name field with "John Doe"
    # ...remaining steps
```

### Adding Tags to New Tests

When extending the test suite with new scenarios, follow these tagging guidelines:

1. Apply relevant feature-level tags to categorize the entire feature
2. Apply scenario-level tags to indicate:
   - Priority (`@priority-high`, `@priority-medium`, `@priority-low`)
   - Test type (`@positive`, `@negative`, etc.)
   - Scope (`@smoke` for critical paths, `@regression` for comprehensive testing)
   - Special designations if applicable (`@debug`, `@fail`, etc.)

Example of a properly tagged new scenario:

```gherkin
@positive @regression @priority-medium
Scenario: Verify form data persistence
    Given I have filled the form with valid data
    When I navigate away and return to the form
    Then my data should still be present in the form fields
```

### Combining Tags with Run Modes

You can combine tag selections with environment modes for maximum flexibility:

```bash
# Run high priority smoke tests in CI mode
cross-env TEST_MODE=ci cucumber-js --tags "@smoke and @priority-high"

# Run form tests but exclude validation tests in development mode
cross-env TEST_MODE=dev cucumber-js --tags "@form and not @validation"

# Run regression tests but not debug tests with Allure reporting
npm run allure:clean && cross-env TEST_MODE=ci cucumber-js --tags "@regression and not @debug"
```

### Running Tagged Tests with Allure Reports

To run tagged tests with Allure reporting:

```bash
# Run and generate Allure report for smoke tests
npm run test:allure:smoke

# Custom tag expression with Allure reporting
npm run allure:clean && cucumber-js --tags "@priority-high and @elements" && npm run allure:generate
```
