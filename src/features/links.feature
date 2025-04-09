Feature: Links Elements
    As a user of demoqa.com website
    I want to test the functionality of links
    So that I can ensure they work correctly

    Scenario: Clicking simple and dynamic links
        Given I open the Links page
        When I click the simple link
        Then I should see the response message "Link has responded"
        When I click the dynamic link
        Then I should see the response message "Link has responded"

    Scenario: Clicking various status links
        Given I open the Links page
        When I click the "created" link
        Then I should see the response message "201 Created"
        When I click the "no content" link
        Then I should see the response message "204 No Content"
        When I click the "moved" link
        Then I should see the response message "301 Moved Permanently"
        When I click the "bad request" link
        Then I should see the response message "400 Bad Request"
        When I click the "unauthorized" link
        Then I should see the response message "401 Unauthorized"
        When I click the "forbidden" link
        Then I should see the response message "403 Forbidden"
        When I click the "not found" link
        Then I should see the response message "404 Not Found"