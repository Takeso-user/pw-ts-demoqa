@web-tables @elements @regression
Feature: Web Tables Elements
    As a user of demoqa.com website
    I want to test the functionality of web tables
    So that I can ensure they work correctly

    @add-record @data-entry @smoke
    Scenario: Adding a new record
        Given I open the Web Tables page
        When I add a new record with the following details:
            | firstName  | John                 |
            | lastName   | Doe                  |
            | email      | john.doe@example.com |
            | age        | 30                   |
            | salary     | 50000                |
            | department | IT                   |
        Then I should see a record with first name "John" and last name "Doe"

    @delete-record @data-management
    Scenario: Deleting a record
        Given I open the Web Tables page
        When I delete the record with first name "John" and last name "Doe"
        Then The record with first name "John" and last name "Doe" should not exist