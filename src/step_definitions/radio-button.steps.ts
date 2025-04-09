import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import RadioButtonPage from '../pages/RadioButtonPage';

Given('I open the Radio Button page', async function() {
  const radioButtonPage = new RadioButtonPage(this.page);
  await radioButtonPage.navigateToRadioButton();
});

When('I click on the {string} radio button', async function(radioName: string) {
  const radioButtonPage = new RadioButtonPage(this.page);

  switch(radioName.toLowerCase()) {
    case 'yes':
      await radioButtonPage.selectYesRadio();
      break;
    case 'impressive':
      await radioButtonPage.selectImpressiveRadio();
      break;
    default:
      throw new Error(`Radio button with name "${radioName}" not found`);
  }
});

Then('I should see the text {string}', async function(expectedText: string) {
  const radioButtonPage = new RadioButtonPage(this.page);
  const result = await radioButtonPage.getResult();
  expect(result).toContain(expectedText);
});

Then('The {string} radio button should be disabled', async function(radioName: string) {
  const radioButtonPage = new RadioButtonPage(this.page);

  if (radioName.toLowerCase() === 'no') {
    const isEnabled = await radioButtonPage.isNoRadioEnabled();
    expect(isEnabled).toBe(false);
  } else {
    throw new Error(`Availability check for radio button "${radioName}" is not implemented`);
  }
});