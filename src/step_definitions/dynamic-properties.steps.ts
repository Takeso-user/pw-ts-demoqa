import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import DynamicPropertiesPage from '../pages/DynamicPropertiesPage';

Given('I open the Dynamic Properties page', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  await dynamicPropertiesPage.navigateToDynamicProperties();
});

When('I wait for the button to be enabled', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  await dynamicPropertiesPage.waitForButtonToBeEnabled();
});

Then('The button should be enabled', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  const isEnabled = await dynamicPropertiesPage.isButtonEnabled();
  expect(isEnabled).toBe(true);
});

When('I wait for the button color to change', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  await dynamicPropertiesPage.waitForColorChange();
});

Then('The button color should be {string}', async function(expectedColor) {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  const color = await dynamicPropertiesPage.getButtonTextColor();
  expect(color).toBe(expectedColor);
});

When('I wait for the button to be visible', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  await dynamicPropertiesPage.waitForButtonToBeVisible();
});

Then('The button should be visible', async function() {
  const dynamicPropertiesPage = new DynamicPropertiesPage(this.page);
  const isVisible = await dynamicPropertiesPage.isButtonVisible();
  expect(isVisible).toBe(true);
});