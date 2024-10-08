const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  timeout: 30000,
  workers: process.env.CI ? 5 : undefined,
  outputDir: "test-results/",
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [["line"], ["allure-playwright"]],
  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: process.env.BASE_URL || stagingConfig.baseURL,
  },
  projects: [
    // Chromium (Desktop Chrome)
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // Firefox
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    // Mobile Chrome
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    // WebKit (Desktop Safari)
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
};

module.exports = config;
