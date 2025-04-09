# Web Elements Testing on DemoQA.com

This project represents an automation testing framework for web elements on [DemoQA Elements](https://demoqa.com/elements) using TypeScript, Playwright, and Cucumber for BDD approach implementation.

## Table of Contents

- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Implemented Tests](#implemented-tests)
- [Extending Tests](#extending-tests)
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
├── cucumber.js          # Cucumber configuration
├── package.json         # Dependencies and npm scripts
├── tsconfig.json        # TypeScript configuration
├── downloads/           # Directory for downloaded files during testing
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

### Run all tests

```bash
npm test
```

### Run specific tests

| Functionality | Command                     |
| ------------- | --------------------------- |
| Text Box      | `npm run test:text-box`     |
| Check Box     | `npm run test:check-box`    |
| Radio Button  | `npm run test:radio-button` |

### Generate report

```bash
npm run report
```

After running, a `cucumber-report.html` file will be created in the project root directory with the test execution report.

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

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.
