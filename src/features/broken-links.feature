Feature: Broken Links and Images
    As a user of demoqa.com website
    I want to test the functionality of broken links and images
    So that I can ensure they work correctly

    Scenario: Valid and broken images
        Given I open the Broken Links page
        Then The valid image should be loaded
        And The broken image should not be loaded

    Scenario: Valid and broken links
        Given I open the Broken Links page
        When I click the valid link
        Then I should see the valid page
        When I click the broken link
        Then The page should return a 500 error