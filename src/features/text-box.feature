Feature: TextBox Elements
    As a user of demoqa.com website
    I want to test the functionality of text fields
    So that I can ensure they work correctly

    Scenario: Fill and submit form with text fields
        Given I open the Text Box page
        When I fill the Full Name field with "John Doe"
        And I fill the Email field with "john.doe@example.com"
        And I fill the Current Address field with "123 Main St"
        And I fill the Permanent Address field with "456 Oak Ave"
        And I click the Submit button
        Then I should see Name: "John Doe"
        And I should see Email: "john.doe@example.com"
        And I should see Current Address: "123 Main St"
        And I should see Permanent Address: "456 Oak Ave"

    Scenario: Submit form with invalid email
        Given I open the Text Box page
        When I fill the Full Name field with "John Doe"
        And I fill the Email field with "invalid-email"
        And I fill the Current Address field with "123 Main St"
        And I fill the Permanent Address field with "456 Oak Ave"
        And I click the Submit button
        Then The Email field should be highlighted as invalid