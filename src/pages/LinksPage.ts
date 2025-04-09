import BasePage from './BasePage';
import { Page } from 'playwright';

export default class LinksPage extends BasePage {
  private simpleLink = '#simpleLink';
  private dynamicLink = '#dynamicLink';
  private createdLink = '#created';
  private noContentLink = '#no-content';
  private movedLink = '#moved';
  private badRequestLink = '#bad-request';
  private unauthorizedLink = '#unauthorized';
  private forbiddenLink = '#forbidden';
  private notFoundLink = '#invalid-url';
  
  private responseMessage = '#linkResponse';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLinks(): Promise<void> {
    await this.navigate('/links');
  }

  async clickSimpleLink(): Promise<Page> {
    try {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page', { timeout: 5000 }),
        this.page.click(this.simpleLink)
      ]);
      return newPage;
    } catch (error) {
      console.warn('Error when clicking simple link:', error);
      return this.page;
    }
  }

  async clickDynamicLink(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click(this.dynamicLink)
    ]);
    return newPage;
  }

  async clickCreatedLink(): Promise<void> {
    try {
      await this.page.click(this.createdLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking created link:', error);
    }
  }

  async clickNoContentLink(): Promise<void> {
    try {
      await this.page.click(this.noContentLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking no content link:', error);
    }
  }

  async clickMovedLink(): Promise<void> {
    try {
      await this.page.click(this.movedLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking moved link:', error);
    }
  }

  async clickBadRequestLink(): Promise<void> {
    try {
      await this.page.click(this.badRequestLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking bad request link:', error);
    }
  }

  async clickUnauthorizedLink(): Promise<void> {
    try {
      await this.page.click(this.unauthorizedLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking unauthorized link:', error);
    }
  }

  async clickForbiddenLink(): Promise<void> {
    try {
      await this.page.click(this.forbiddenLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking forbidden link:', error);
    }
  }

  async clickNotFoundLink(): Promise<void> {
    try {
      await this.page.click(this.notFoundLink, { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.warn('Error clicking not found link:', error);
    }
  }

  async getResponseMessage(): Promise<string> {
    try {
      return await this.page.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent || '' : '';
      }, this.responseMessage) || '';
    } catch (error) {
      console.warn('Warning when getting response message:', error);
      
      try {
        const text = await this.page.textContent(this.responseMessage) || '';
        return text;
      } catch (innerError) {
        console.warn('Error getting text content:', innerError);
        return '';
      }
    }
  }
  
  async clearResponseMessage(): Promise<void> {
    try {
      await this.page.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = '';
      }, this.responseMessage);
    } catch (error) {
      console.warn('Error clearing response message:', error);
    }
  }
}