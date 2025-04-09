import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import ButtonsPage from '../pages/ButtonsPage';

Given('I open the Buttons page', async function() {
  const buttonsPage = new ButtonsPage(this.page);
  await buttonsPage.navigateToButtons();
});

When('I double-click the button', async function() {
  const buttonsPage = new ButtonsPage(this.page);
  await buttonsPage.performDoubleClick();
});

Then('I should see the double-click message {string}', async function(expectedMessage) {
  const buttonsPage = new ButtonsPage(this.page);
  const message = await buttonsPage.getDoubleClickMessage();
  expect(message).toContain(expectedMessage);
});

When('I right-click the button', async function() {
  const buttonsPage = new ButtonsPage(this.page);
  await buttonsPage.performRightClick();
});

Then('I should see the right-click message {string}', async function(expectedMessage) {
  const buttonsPage = new ButtonsPage(this.page);
  const message = await buttonsPage.getRightClickMessage();
  expect(message).toContain(expectedMessage);
});

When('I click the dynamic button', async function() {
  const buttonsPage = new ButtonsPage(this.page);
  await buttonsPage.performDynamicClick();
});

Then('I should see the dynamic click message {string}', async function(expectedMessage) {
  const buttonsPage = new ButtonsPage(this.page);
  const message = await buttonsPage.getDynamicClickMessage();
  expect(message).toContain(expectedMessage);
});