import BasePage from './BasePage';
import { Page } from 'playwright';

export default class TextBoxPage extends BasePage {
  private fullNameInput = '#userName';
  private emailInput = '#userEmail';
  private currentAddressInput = '#currentAddress';
  private permanentAddressInput = '#permanentAddress';
  private submitButton = '#submit';
  
  private outputName = '#name';
  private outputEmail = '#email';
  private outputCurrentAddress = '#currentAddress.mb-1';
  private outputPermanentAddress = '#permanentAddress.mb-1';

  constructor(page: Page) {
    super(page);
  }

  async navigateToTextBox(): Promise<void> {
    await this.navigate('/text-box');
  }

  async fillForm(fullName: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
    await this.page.fill(this.fullNameInput, fullName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.currentAddressInput, currentAddress);
    await this.page.fill(this.permanentAddressInput, permanentAddress);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async getOutputName(): Promise<string | null> {
    const isVisible = await this.isElementVisible(this.outputName);
    if (!isVisible) return null;
    
    const text = await this.page.textContent(this.outputName);
    return text;
  }

  async getOutputEmail(): Promise<string | null> {
    const isVisible = await this.isElementVisible(this.outputEmail);
    if (!isVisible) return null;
    
    const text = await this.page.textContent(this.outputEmail);
    return text;
  }

  async getOutputCurrentAddress(): Promise<string | null> {
    const isVisible = await this.isElementVisible(this.outputCurrentAddress);
    if (!isVisible) return null;
    
    const text = await this.page.textContent(this.outputCurrentAddress);
    return text;
  }

  async getOutputPermanentAddress(): Promise<string | null> {
    const isVisible = await this.isElementVisible(this.outputPermanentAddress);
    if (!isVisible) return null;
    
    const text = await this.page.textContent(this.outputPermanentAddress);
    return text;
  }
}