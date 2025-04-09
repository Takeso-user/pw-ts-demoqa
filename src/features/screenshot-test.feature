Feature: Screenshot Test for Failures
    As a QA engineer
    I want to capture screenshots when tests fail
    So that I can better debug issues

  Scenario: Deliberately failing test to test screenshot functionality
    Given I open the Text Box page
    When I fill the Full Name field with "John Doe"
    And I fill the Email field with "john.doe@example.com"
    And I fill the Current Address field with "123 Main St"
    And I fill the Permanent Address field with "456 Oak Ave"
    And I click the Submit button
        # This step will intentionally fail to trigger screenshot capture
    Then I should see Name: "Different Name"
