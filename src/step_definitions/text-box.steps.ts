import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import TextBoxPage from '../pages/TextBoxPage';

Given('I open the Text Box page', async function() {
  const textBoxPage = new TextBoxPage(this.page);
  await textBoxPage.navigateToTextBox();
});

When('I fill the Full Name field with {string}', async function(fullName: string) {
  const textBoxPage = new TextBoxPage(this.page);
  await this.page.fill('#userName', fullName);
});

When('I fill the Email field with {string}', async function(email: string) {
  const textBoxPage = new TextBoxPage(this.page);
  await this.page.fill('#userEmail', email);
});

When('I fill the Current Address field with {string}', async function(address: string) {
  const textBoxPage = new TextBoxPage(this.page);
  await this.page.fill('#currentAddress', address);
});

When('I fill the Permanent Address field with {string}', async function(address: string) {
  const textBoxPage = new TextBoxPage(this.page);
  await this.page.fill('#permanentAddress', address);
});

When('I click the Submit button', async function() {
  const textBoxPage = new TextBoxPage(this.page);
  await textBoxPage.submitForm();
});

Then('I should see Name: {string}', async function(expectedName: string) {
  const textBoxPage = new TextBoxPage(this.page);
  const outputName = await textBoxPage.getOutputName();
  expect(outputName).toContain(expectedName);
});

Then('I should see Email: {string}', async function(expectedEmail: string) {
  const textBoxPage = new TextBoxPage(this.page);
  const outputEmail = await textBoxPage.getOutputEmail();
  expect(outputEmail).toContain(expectedEmail);
});

Then('I should see Current Address: {string}', async function(expectedAddress: string) {
  const textBoxPage = new TextBoxPage(this.page);
  const outputAddress = await textBoxPage.getOutputCurrentAddress();
  expect(outputAddress).toContain(expectedAddress);
});

Then('I should see Permanent Address: {string}', async function(expectedAddress: string) {
  const textBoxPage = new TextBoxPage(this.page);
  const outputAddress = await textBoxPage.getOutputPermanentAddress();
  expect(outputAddress).toContain(expectedAddress);
});

Then('The Email field should be highlighted as invalid', async function() {
  const hasErrorClass = await this.page.evaluate(() => {
    const element = document.querySelector('#userEmail');
    return element && element.classList.contains('field-error');
  });
  expect(hasErrorClass).toBeTruthy();
});