import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { World } from '@cucumber/cucumber';

interface CustomWorld extends World {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;
}

// Настройка браузера и страницы
async function setupBrowser(this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: false,
    slowMo: 5 // Замедление для наглядности выполнения
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
}

// Закрытие браузера
async function teardownBrowser(this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
  }
}

export { CustomWorld, setupBrowser, teardownBrowser };