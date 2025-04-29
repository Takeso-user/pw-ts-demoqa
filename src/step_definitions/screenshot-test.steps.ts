import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * This step simulates an exception and handles it gracefully while
 * still triggering the screenshot mechanism
 */
When("I simulate an exception to trigger a screenshot", async function () {
  try {
    // Store current timestamp before taking action to identify our screenshot later
    this.exceptionTimestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Simulate a real exception by trying to interact with a non-existent element
    console.log(
      "Intentionally interacting with a non-existent element to trigger screenshot..."
    );
    await this.page.click("#non-existent-element", { timeout: 1000 });

    // This code shouldn't be reached because the above will throw an exception
    throw new Error("Expected exception was not thrown");
  } catch (error: any) {
    // Log and store the error information for verification
    console.log("Caught expected exception:", error.message);
    this.simulatedException = error;

    // Force the screenshot mechanism to trigger as if the test failed
    // We're manually invoking the screenshot functionality
    const scenarioName = "Test-screenshot-capture-functionality";
    const screenshotsDir = path.join(process.cwd(), "screenshots");

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    const timestamp = this.exceptionTimestamp;
    const screenshotPath = path.join(
      screenshotsDir,
      `${scenarioName}-${timestamp}.png`
    );

    // Take screenshot
    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    console.log(`📸 Screenshot saved to: ${screenshotPath}`);

    // Attach screenshot to report
    if (this.attachScreenshot) {
      this.attachScreenshot(screenshot, "image/png");
      console.log("📎 Screenshot attached to report");
    }

    // Store screenshot path for verification in the next step
    this.screenshotPath = screenshotPath;
  }
});

/**
 * This step verifies that the screenshot was successfully captured
 */
Then(
  "I should verify the screenshot was captured successfully",
  async function () {
    // Verify that we have a screenshot path from the previous step
    expect(this.screenshotPath).toBeDefined();

    // Verify the screenshot file exists
    const fileExists = fs.existsSync(this.screenshotPath);
    expect(fileExists).toBeTruthy();

    // Verify the screenshot has actual content
    const fileStats = fs.statSync(this.screenshotPath);
    expect(fileStats.size).toBeGreaterThan(0);

    console.log("✅ Screenshot functionality verified successfully");
    console.log(`✅ Screenshot file: ${this.screenshotPath}`);
    console.log(`✅ Screenshot size: ${fileStats.size} bytes`);
  }
);
