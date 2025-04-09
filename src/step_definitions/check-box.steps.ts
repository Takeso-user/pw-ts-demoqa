import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CheckBoxPage from '../pages/CheckBoxPage';

Given('I open the Check Box page', async function() {
  const checkBoxPage = new CheckBoxPage(this.page);
  await checkBoxPage.navigateToCheckBox();
});

When('I expand all checkboxes', async function() {
  const checkBoxPage = new CheckBoxPage(this.page);
  await checkBoxPage.expandAll();
});

When('I collapse all checkboxes', async function() {
  const checkBoxPage = new CheckBoxPage(this.page);
  await checkBoxPage.collapseAll();
});

When('I click on the {string} checkbox', async function(checkboxName: string) {
  await this.page.click(`span.rct-title:has-text("${checkboxName}")`);
});

Then('I should see a result containing {string}', async function(expectedText: string) {
  const checkBoxPage = new CheckBoxPage(this.page);
  const resultText = await checkBoxPage.getResult();
  expect(resultText.toLowerCase()).toContain(expectedText.toLowerCase());
});

Then('The result should contain {string}', async function(expectedText: string) {
  const checkBoxPage = new CheckBoxPage(this.page);
  const resultText = await checkBoxPage.getResult();
  expect(resultText.toLowerCase()).toContain(expectedText.toLowerCase());
});