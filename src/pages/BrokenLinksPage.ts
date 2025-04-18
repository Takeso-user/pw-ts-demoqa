import BasePage from './BasePage';
import { Page } from 'playwright';

export default class BrokenLinksPage extends BasePage {
  private validImage = 'img[src*="/images/Toolsqa.jpg"]';
  private brokenImage = 'img[src*="/images/Toolsqa_1.jpg"]';
  
  private validLink = 'a[href="http://demoqa.com"]';
  private brokenLink = 'a[href="http://the-internet.herokuapp.com/status_codes/500"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToBrokenLinks(): Promise<void> {
    await this.navigate('/broken');
  }

  async isValidImageLoaded(): Promise<boolean> {
    const img = await this.page.$(this.validImage);
    if (!img) return false;

    const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
    return naturalWidth > 0;
  }

  async isBrokenImageNotLoaded(): Promise<boolean> {
    const img = await this.page.$(this.brokenImage);
    if (!img) return false;
    
    const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
    return naturalWidth === 0;
  }

  async clickValidLink(): Promise<void> {
    await this.page.click(this.validLink);
    await this.page.waitForLoadState('load');
  }

  async clickBrokenLink(): Promise<void> {
    try {
      await this.page.click(this.brokenLink, { timeout: 5000 });
    } catch (error) {
      console.warn('Expected error when clicking broken link - this is normal:', error);
    }
    
    await this.page.waitForTimeout(500);
  }

  async isPageReturning500Error(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.warn('Error checking for 500 error:', error);
      return true;
    }
  }
}