import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { World } from '@cucumber/cucumber';

interface CustomWorld extends World {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;
}

async function setupBrowser(this: CustomWorld) {
  const isDevMode = process.env.TEST_MODE === 'dev';
  
  const devConfig = {
    headless: false,
    slowMo: 250 
  };
  
  const ciConfig = {
    headless: true,
    slowMo: 5 
  };
  
  const config = isDevMode ? devConfig : ciConfig;
  
  this.browser = await chromium.launch(config);
  
  if (isDevMode) {
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    console.log('🚀 Running in DEVELOPMENT mode with browser UI');
  } else {
    this.context = await this.browser.newContext();
    console.log('🚀 Running in CI/CD mode (headless)');
  }
  
  this.page = await this.context.newPage();
}

async function teardownBrowser(this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
  }
}

export { CustomWorld, setupBrowser, teardownBrowser };