import { setWorldConstructor, World, setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { CustomWorld, setupBrowser, teardownBrowser } from './playwrightSetup';

setDefaultTimeout(30 * 1000);

class CucumberWorld extends World implements CustomWorld {
  browser: any;
  context: any;
  page: any;

  constructor(options: any) {
    super(options);
  }
}

setWorldConstructor(CucumberWorld);

Before(setupBrowser);

After(teardownBrowser);