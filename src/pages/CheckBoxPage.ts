import BasePage from './BasePage';
import { Page } from 'playwright';

export default class CheckBoxPage extends BasePage {
  private expandAllButton = 'button[title="Expand all"]';
  private collapseAllButton = 'button[title="Collapse all"]';
  private homeCheckbox = 'span.rct-title:has-text("Home")';
  private desktopCheckbox = 'span.rct-title:has-text("Desktop")';
  private documentsCheckbox = 'span.rct-title:has-text("Documents")';
  private downloadsCheckbox = 'span.rct-title:has-text("Downloads")';
  
  private result = '#result';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCheckBox(): Promise<void> {
    await this.navigate('/checkbox');
  }

  async expandAll(): Promise<void> {
    await this.page.click(this.expandAllButton);
  }

  async collapseAll(): Promise<void> {
    await this.page.click(this.collapseAllButton);
  }

  async selectHomeCheckbox(): Promise<void> {
    await this.page.click(this.homeCheckbox);
  }

  async selectDesktopCheckbox(): Promise<void> {
    await this.page.click(this.desktopCheckbox);
  }

  async selectDocumentsCheckbox(): Promise<void> {
    await this.page.click(this.documentsCheckbox);
  }

  async selectDownloadsCheckbox(): Promise<void> {
    await this.page.click(this.downloadsCheckbox);
  }

  async getResult(): Promise<string> {
    await this.waitForElement(this.result);
    return await this.page.textContent(this.result) || '';
  }
}