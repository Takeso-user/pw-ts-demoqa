@screenshot @regression
Feature: Screenshot Test for Failures
    As a QA engineer
    I want to capture screenshots when tests encounter exceptions
    So that I can better debug issues

  @smoke @priority-medium
  Scenario: Test screenshot capture functionality
    Given I open the Text Box page
    When I simulate an exception to trigger a screenshot
    Then I should verify the screenshot was captured successfully
