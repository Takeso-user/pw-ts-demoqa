import BasePage from './BasePage';
import { Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

export default class UploadDownloadPage extends BasePage {
  private downloadButton = '#downloadButton';
  private uploadButton = '#uploadFile';
  private uploadedFilePath = '#uploadedFilePath';

  constructor(page: Page) {
    super(page);
  }

  async navigateToUploadDownload(): Promise<void> {
    await this.navigate('/upload-download');
  }

  async downloadFile(): Promise<string> {
    try {
      await this.page.click(this.downloadButton);
      
      await this.page.waitForTimeout(1000);
      
      const fileName = 'sampleFile.jpeg';
      const downloadPath = path.join(process.cwd(), 'downloads', fileName);
      
      const downloadsDir = path.dirname(downloadPath);
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
      
      return downloadPath;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  async uploadFile(filePath: string): Promise<void> {
    const input = await this.page.$(this.uploadButton);
    if (input) {
      await input.setInputFiles(filePath);
    }
  }

  async getUploadedFilePath(): Promise<string | null> {
    await this.waitForElement(this.uploadedFilePath);
    const text = await this.page.textContent(this.uploadedFilePath);
    return text;
  }
  
  async isFileUploaded(): Promise<boolean> {
    const isVisible = await this.isElementVisible(this.uploadedFilePath);
    return isVisible;
  }
}