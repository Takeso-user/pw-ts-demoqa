import { setWorldConstructor, World, setDefaultTimeout, Before, After, ITestCaseHookParameter } from '@cucumber/cucumber';
import { CustomWorld, setupBrowser, teardownBrowser } from './playwrightSetup';

setDefaultTimeout(30 * 1000);

class CucumberWorld extends World implements CustomWorld {
  browser: any;
  context: any;
  page: any;
  attachScreenshot?: (data: Buffer, mimeType: string) => void;
  
  constructor(options: any) {
    super(options);
    
    // Initialize attachScreenshot method
    this.attachScreenshot = (data: Buffer, mimeType: string) => {
      try {
        // Use the attach method from Cucumber's World
        this.attach(data, mimeType);
      } catch (error) {
        console.error('Failed to attach screenshot to report:', error);
      }
    };
  }
}

setWorldConstructor(CucumberWorld);

Before(setupBrowser);

// Fix the type issue by using function() instead of an arrow function
After(function(this: CucumberWorld, scenario: ITestCaseHookParameter) {
  return teardownBrowser.call(this, scenario);
});