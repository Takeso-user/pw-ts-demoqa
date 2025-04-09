import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import WebTablesPage from '../pages/WebTablesPage';

Given('I open the Web Tables page', async function() {
  const webTablesPage = new WebTablesPage(this.page);
  await webTablesPage.navigateToWebTables();
});

When('I add a new record with the following details:', async function(dataTable) {
  const webTablesPage = new WebTablesPage(this.page);
  const record = dataTable.rowsHash();
  await webTablesPage.clickAddButton();
  await webTablesPage.fillRegistrationForm(record);
  await webTablesPage.submitForm();
});

Then('I should see a record with first name {string} and last name {string}', async function(firstName, lastName) {
  const webTablesPage = new WebTablesPage(this.page);
  const exists = await webTablesPage.recordExists(firstName, lastName);
  expect(exists).toBe(true);
});

When('I delete the record with first name {string} and last name {string}', async function(firstName, lastName) {
  const webTablesPage = new WebTablesPage(this.page);
  await webTablesPage.deleteRecord(firstName, lastName);
});

Then('The record with first name {string} and last name {string} should not exist', async function(firstName, lastName) {
  const webTablesPage = new WebTablesPage(this.page);
  const exists = await webTablesPage.recordExists(firstName, lastName);
  expect(exists).toBe(false);
});