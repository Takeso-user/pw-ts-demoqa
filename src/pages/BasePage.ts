import { Page } from 'playwright';

export default class BasePage {
  protected page: Page;
  protected baseUrl: string = 'https://demoqa.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }
}