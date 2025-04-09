import BasePage from './BasePage';
import { Page } from 'playwright';

export default class DynamicPropertiesPage extends BasePage {
  private enableAfterButton = '#enableAfter';
  private colorChangeButton = '#colorChange';
  private visibleAfterButton = '#visibleAfter';

  constructor(page: Page) {
    super(page);
  }

  async navigateToDynamicProperties(): Promise<void> {
    await this.navigate('/dynamic-properties');
  }

  async waitForButtonToBeEnabled(): Promise<void> {
    await this.page.waitForSelector(`${this.enableAfterButton}:enabled`, { timeout: 10000 });
  }

  async isButtonEnabled(): Promise<boolean> {
    const button = await this.page.$(this.enableAfterButton);
    if (!button) return false;

    return await button.isEnabled();
  }

  async waitForColorChange(): Promise<void> {
    await this.page.waitForFunction(
      selector => {
        const element = document.querySelector(selector);
        if (!element) return false;
        const style = window.getComputedStyle(element);
        return style.color === 'rgb(220, 53, 69)' || style.color === '#dc3545';
      },
      this.colorChangeButton,
      { timeout: 10000 }
    );
  }

  async getButtonTextColor(): Promise<string> {
    const button = await this.page.$(this.colorChangeButton);
    if (!button) return '';

    return await button.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
  }

  async waitForButtonToBeVisible(): Promise<void> {
    await this.page.waitForSelector(this.visibleAfterButton, { state: 'visible', timeout: 10000 });
  }

  async isButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.visibleAfterButton);
  }
}