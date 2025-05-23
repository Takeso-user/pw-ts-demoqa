@dynamic-properties @elements @regression
Feature: Dynamic Properties Elements
    As a user of demoqa.com website
    I want to test the functionality of dynamic properties
    So that I can ensure they work correctly

    @timing @async @smoke
    Scenario: Button enabling after delay
        Given I open the Dynamic Properties page
        When I wait for the button to be enabled
        Then The button should be enabled

    @visual @color-change
    Scenario: Button color change
        Given I open the Dynamic Properties page
        When I wait for the button color to change
        Then The button color should be "rgb(220, 53, 69)"

    @visibility @async @smoke
    Scenario: Button visibility after delay
        Given I open the Dynamic Properties page
        When I wait for the button to be visible
        Then The button should be visible