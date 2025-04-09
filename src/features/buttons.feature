Feature: Buttons Elements
    As a user of demoqa.com website
    I want to test the functionality of buttons
    So that I can ensure they work correctly

    Scenario: Double-clicking a button
        Given I open the Buttons page
        When I double-click the button
        Then I should see the double-click message "You have done a double click"

    Scenario: Right-clicking a button
        Given I open the Buttons page
        When I right-click the button
        Then I should see the right-click message "You have done a right click"

    Scenario: Clicking a dynamic button
        Given I open the Buttons page
        When I click the dynamic button
        Then I should see the dynamic click message "You have done a dynamic click"