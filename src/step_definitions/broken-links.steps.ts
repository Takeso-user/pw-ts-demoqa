import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import BrokenLinksPage from '../pages/BrokenLinksPage';

Given('I open the Broken Links page', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  await brokenLinksPage.navigateToBrokenLinks();
});

Then('The valid image should be loaded', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  const isLoaded = await brokenLinksPage.isValidImageLoaded();
  expect(isLoaded).toBe(true);
});

Then('The broken image should not be loaded', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  const isNotLoaded = await brokenLinksPage.isBrokenImageNotLoaded();
  expect(isNotLoaded).toBe(true);
});

When('I click the valid link', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  await brokenLinksPage.clickValidLink();
});

When('I click the broken link', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  await brokenLinksPage.clickBrokenLink();
});

Then('The page should return a 500 error', async function() {
  const brokenLinksPage = new BrokenLinksPage(this.page);
  const isError = await brokenLinksPage.isPageReturning500Error();
  expect(isError).toBe(true);
});

Then('I should see the valid page', async function() {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('demoqa.com');
});