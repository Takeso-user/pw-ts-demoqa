import BasePage from './BasePage';
import { Page } from 'playwright';

export default class ElementsPage extends BasePage {
  private elementsCard = 'div.card:has-text("Elements")';
  private elementsHeader = '.main-header:has-text("Elements")';
  
  private textBoxLink = 'span.text:has-text("Text Box")';
  private checkBoxLink = 'span.text:has-text("Check Box")';
  private radioButtonLink = 'span.text:has-text("Radio Button")';
  private webTablesLink = 'span.text:has-text("Web Tables")';
  private buttonsLink = 'span.text:has-text("Buttons")';
  private linksLink = 'span.text:has-text("Links")';
  private brokenLinksLink = 'span.text:has-text("Broken Links - Images")';
  private uploadDownloadLink = 'span.text:has-text("Upload and Download")';
  private dynamicPropertiesLink = 'span.text:has-text("Dynamic Properties")';
  
  constructor(page: Page) {
    super(page);
  }

  async navigateToElementsPage(): Promise<void> {
    await this.navigate('/');
    await this.page.click(this.elementsCard);
    await this.waitForElement(this.elementsHeader);
  }

  async openTextBox(): Promise<void> {
    await this.page.click(this.textBoxLink);
  }

  async openCheckBox(): Promise<void> {
    await this.page.click(this.checkBoxLink);
  }

  async openRadioButton(): Promise<void> {
    await this.page.click(this.radioButtonLink);
  }

  async openWebTables(): Promise<void> {
    await this.page.click(this.webTablesLink);
  }

  async openButtons(): Promise<void> {
    await this.page.click(this.buttonsLink);
  }

  async openLinks(): Promise<void> {
    await this.page.click(this.linksLink);
  }

  async openBrokenLinks(): Promise<void> {
    await this.page.click(this.brokenLinksLink);
  }

  async openUploadDownload(): Promise<void> {
    await this.page.click(this.uploadDownloadLink);
  }

  async openDynamicProperties(): Promise<void> {
    await this.page.click(this.dynamicPropertiesLink);
  }
}