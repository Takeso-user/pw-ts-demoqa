@checkbox @elements @regression
Feature: CheckBox Elements
    As a user of demoqa.com website
    I want to test the functionality of checkboxes
    So that I can ensure they work correctly

  @smoke @priority-high
  Scenario: Selecting Home checkbox
    Given I open the Check Box page
    When I click on the "Home" checkbox
    Then I should see a result containing "home"
    And The result should contain "desktop"
    And The result should contain "documents"
    And The result should contain "downloads"

  @functional @priority-medium
  Scenario: Selecting Desktop checkbox
    Given I open the Check Box page
    When I expand all checkboxes
    And I click on the "Desktop" checkbox
    Then I should see a result containing "desktop"
    And The result should contain "notes"
    And The result should contain "commands"

  @functional @priority-medium
  Scenario: Selecting Downloads checkbox
    Given I open the Check Box page
    When I expand all checkboxes
    And I click on the "Downloads" checkbox
    Then I should see a result containing "downloads"
    And The result should contain "wordFile"
    And The result should contain "excelFile"
