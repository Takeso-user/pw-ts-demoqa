@buttons @elements @regression
Feature: Buttons Elements
    As a user of demoqa.com website
    I want to test the functionality of buttons
    So that I can ensure they work correctly

    @double-click @interaction @smoke
    Scenario: Double-clicking a button
        Given I open the Buttons page
        When I double-click the button
        Then I should see the double-click message "You have done a double click"

    @right-click @interaction @smoke
    Scenario: Right-clicking a button
        Given I open the Buttons page
        When I right-click the button
        Then I should see the right-click message "You have done a right click"

    @dynamic-click @interaction
    Scenario: Clicking a dynamic button
        Given I open the Buttons page
        When I click the dynamic button
        Then I should see the dynamic click message "You have done a dynamic click"