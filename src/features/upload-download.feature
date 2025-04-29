@upload-download @elements @regression
Feature: Upload and Download Elements
    As a user of demoqa.com website
    I want to test the functionality of upload and download
    So that I can ensure they work correctly

    @download @smoke
    Scenario: Downloading a file
        Given I open the Upload and Download page
        When I download a file
        Then The file should be downloaded

    @upload @smoke
    Scenario: Uploading a file
        Given I open the Upload and Download page
        When I upload the file "test-file.txt"
        Then The uploaded file path should be displayed as "test-file.txt"