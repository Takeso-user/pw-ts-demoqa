import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import UploadDownloadPage from '../pages/UploadDownloadPage';
import * as fs from 'fs';

Given('I open the Upload and Download page', async function() {
  const uploadDownloadPage = new UploadDownloadPage(this.page);
  await uploadDownloadPage.navigateToUploadDownload();
});

When('I download a file', async function() {
  const uploadDownloadPage = new UploadDownloadPage(this.page);
  this.downloadedFilePath = await uploadDownloadPage.downloadFile();
});

Then('The file should be downloaded', async function() {
  expect(fs.existsSync(this.downloadedFilePath)).toBe(true);
});

When('I upload the file {string}', async function(filePath) {
  const uploadDownloadPage = new UploadDownloadPage(this.page);
  await uploadDownloadPage.uploadFile(filePath);
});

Then('The uploaded file path should be displayed as {string}', async function(expectedPath) {
  const uploadDownloadPage = new UploadDownloadPage(this.page);
  const uploadedPath = await uploadDownloadPage.getUploadedFilePath();
  expect(uploadedPath).toContain(expectedPath);
});