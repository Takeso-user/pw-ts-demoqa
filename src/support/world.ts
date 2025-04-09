import { setWorldConstructor, World, setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { CustomWorld, setupBrowser, teardownBrowser } from './playwrightSetup';

// Устанавливаем максимальное время для шагов (30 секунд)
setDefaultTimeout(30 * 1000);

// Создаем класс CustomWorld, расширяющий World из Cucumber
class CucumberWorld extends World implements CustomWorld {
  browser: any;
  context: any;
  page: any;

  constructor(options: any) {
    super(options);
  }
}

// Устанавливаем CustomWorld как мир для Cucumber
setWorldConstructor(CucumberWorld);

// Настройка браузера перед каждым сценарием
Before(setupBrowser);

// Закрытие браузера после каждого сценария
After(teardownBrowser);