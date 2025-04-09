import BasePage from './BasePage';
import { Page } from 'playwright';

export default class RadioButtonPage extends BasePage {
  private yesRadioLabel = 'label[for="yesRadio"]';
  private impressiveRadioLabel = 'label[for="impressiveRadio"]';
  private noRadioLabel = 'label[for="noRadio"]';
  private result = '.mt-3';

  constructor(page: Page) {
    super(page);
  }

  async navigateToRadioButton(): Promise<void> {
    await this.navigate('/radio-button');
  }

  async selectYesRadio(): Promise<void> {
    await this.page.click(this.yesRadioLabel);
  }

  async selectImpressiveRadio(): Promise<void> {
    await this.page.click(this.impressiveRadioLabel);
  }

  async isNoRadioEnabled(): Promise<boolean> {
    const noRadio = await this.page.$(`${this.noRadioLabel} input`);
    if (!noRadio) return false;
    return !await noRadio.isDisabled();
  }

  async getResult(): Promise<string> {
    await this.waitForElement(this.result);
    return await this.page.textContent(this.result) || '';
  }
}