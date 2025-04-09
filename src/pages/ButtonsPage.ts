import BasePage from './BasePage';
import { Page } from 'playwright';

export default class ButtonsPage extends BasePage {
  private doubleClickButton = '#doubleClickBtn';
  private rightClickButton = '#rightClickBtn';
  private dynamicClickButton = 'button:text("Click Me")';
  
  private doubleClickMessage = '#doubleClickMessage';
  private rightClickMessage = '#rightClickMessage';
  private dynamicClickMessage = '#dynamicClickMessage';

  constructor(page: Page) {
    super(page);
  }

  async navigateToButtons(): Promise<void> {
    await this.navigate('/buttons');
  }

  async performDoubleClick(): Promise<void> {
    await this.page.dblclick(this.doubleClickButton);
  }

  async performRightClick(): Promise<void> {
    await this.page.click(this.rightClickButton, { button: 'right' });
  }

  async performDynamicClick(): Promise<void> {
    try {
      // Попробуем найти кнопку более точным селектором
      await this.page.click('button:has-text("Click Me"):not(#doubleClickBtn):not(#rightClickBtn)', { timeout: 5000 });
      // Небольшая пауза для обновления UI
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking dynamic button:', error);
      // Если точный селектор не сработал, используем оригинальный
      await this.page.click(this.dynamicClickButton);
    }
  }

  async getDoubleClickMessage(): Promise<string | null> {
    await this.waitForElement(this.doubleClickMessage);
    return await this.page.textContent(this.doubleClickMessage);
  }

  async getRightClickMessage(): Promise<string | null> {
    await this.waitForElement(this.rightClickMessage);
    return await this.page.textContent(this.rightClickMessage);
  }

  async getDynamicClickMessage(): Promise<string | null> {
    try {
      // Уменьшаем таймаут и добавляем обработку ошибок
      await this.page.waitForSelector(this.dynamicClickMessage, { timeout: 10000 });
      return await this.page.textContent(this.dynamicClickMessage);
    } catch (error) {
      console.warn('Warning when getting dynamic click message:', error);
      // Если сообщение не появилось, попробуем получить его напрямую
      const text = await this.page.textContent(this.dynamicClickMessage);
      return text;
    }
  }
}