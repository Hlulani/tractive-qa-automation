import { test as baseTest } from "@playwright/test";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const test = baseTest.extend({
  page: async ({ page, context }, use) => {
    const baseURL = process.env.BASE_URL || "https://my-stage.tractive.com";

    // Set the required cookie
    await context.addCookies([
      {
        name: "interview",
        value: "7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl",
        domain: ".tractive.com",
        path: "/",
        secure: true,
      },
    ]);

    // Navigate to the base URL
    await page.goto(baseURL);

    // Accept cookies
    const acceptCookiesButton = page.locator(".js-cookie-consent-accept");

    // Retry clicking the accept button if it appears
    try {
      if (await acceptCookiesButton.isVisible({ timeout: 5000 })) {
        await acceptCookiesButton.click();
        await page.waitForSelector(".js-cookie-consent-accept", {
          state: "detached",
        });
      }
    } catch (e) {
      console.log(
        "Cookie consent popup did not appear or could not be clicked"
      );
    }

    // Continue with the test after setting up cookies and handling consent
    await use(page);
  },
  // Add afterEach to close the page and context
  afterEach: async ({ page, context }) => {
    await page.close();
    await context.close();
  },
});

export { test };
