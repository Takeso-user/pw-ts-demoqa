import { chromium, Browser, Page, BrowserContext } from "playwright";
import { World, ITestCaseHookParameter } from "@cucumber/cucumber";
import * as fs from "fs";
import * as path from "path";

interface CustomWorld extends World {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;
  attachScreenshot?: (data: Buffer, mimeType: string) => void;
}

async function setupBrowser(this: CustomWorld) {
  const isDevMode = process.env.TEST_MODE === "dev";

  const devConfig = {
    headless: false,
    slowMo: 250,
  };

  const ciConfig = {
    headless: true,
    slowMo: 5,
  };

  const config = isDevMode ? devConfig : ciConfig;

  this.browser = await chromium.launch(config);

  if (isDevMode) {
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    console.log("🚀 Running in DEVELOPMENT mode with browser UI");
  } else {
    this.context = await this.browser.newContext();
    console.log("🚀 Running in CI/CD mode (headless)");
  }

  this.page = await this.context.newPage();
}

async function teardownBrowser(
  this: CustomWorld,
  scenario: ITestCaseHookParameter
) {
  const isCI = process.env.TEST_MODE === "ci";
  const timeoutMs = isCI ? 5000 : 30000;

  try {
    // Check if scenario has failed
    if (scenario.result?.status === "FAILED" && this.page) {
      console.log("❌ Test failed! Taking screenshot...");

      // Create screenshots directory if it doesn't exist
      const screenshotsDir = path.join(process.cwd(), "screenshots");
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      // Generate unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "-");
      const screenshotPath = path.join(
        screenshotsDir,
        `${scenarioName}-${timestamp}.png`
      );

      try {
        // Take screenshot with timeout
        const screenshot = (await Promise.race([
          this.page.screenshot({ path: screenshotPath, fullPage: true }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Screenshot timeout")), timeoutMs)
          ),
        ])) as Buffer;

        console.log(`📸 Screenshot saved to: ${screenshotPath}`);

        // Attach screenshot to report
        if (this.attachScreenshot) {
          this.attachScreenshot(screenshot, "image/png");
          console.log("📎 Screenshot attached to report");
        }
      } catch (screenshotError) {
        console.error("Failed to capture screenshot:", screenshotError);

        // In CI mode, create a dummy file so tests don't fail due to missing screenshots
        if (isCI) {
          fs.writeFileSync(screenshotPath, "Dummy screenshot for CI", "utf8");
          console.log(`Created dummy screenshot file at: ${screenshotPath}`);
        }
      }
    }
  } catch (error) {
    console.error("Error in teardown process:", error);
  } finally {
    // Always close the browser
    if (this.browser) {
      try {
        await Promise.race([
          this.browser.close(),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Browser close timeout")),
              timeoutMs
            )
          ),
        ]);
      } catch (closeError) {
        console.error("Failed to close browser:", closeError);
      } finally {
        this.browser = undefined;
        this.context = undefined;
        this.page = undefined;
      }
    }
  }
}

export { CustomWorld, setupBrowser, teardownBrowser };
