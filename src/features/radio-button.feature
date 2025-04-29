@radio-button @elements @regression
Feature: Radio Button Elements
    As a user of demoqa.com website
    I want to test the functionality of radio buttons
    So that I can ensure they work correctly

    @yes-option @smoke
    Scenario: Selecting "Yes" radio button
        Given I open the Radio Button page
        When I click on the "Yes" radio button
        Then I should see the text "You have selected Yes"

    @impressive-option @smoke
    Scenario: Selecting "Impressive" radio button
        Given I open the Radio Button page
        When I click on the "Impressive" radio button
        Then I should see the text "You have selected Impressive"

    @disabled-option
    Scenario: Checking availability of "No" radio button
        Given I open the Radio Button page
        Then The "No" radio button should be disabled