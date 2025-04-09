Feature: Radio Button Elements
    As a user of demoqa.com website
    I want to test the functionality of radio buttons
    So that I can ensure they work correctly

    Scenario: Selecting "Yes" radio button
        Given I open the Radio Button page
        When I click on the "Yes" radio button
        Then I should see the text "You have selected Yes"

    Scenario: Selecting "Impressive" radio button
        Given I open the Radio Button page
        When I click on the "Impressive" radio button
        Then I should see the text "You have selected Impressive"

    Scenario: Checking availability of "No" radio button
        Given I open the Radio Button page
        Then The "No" radio button should be disabled