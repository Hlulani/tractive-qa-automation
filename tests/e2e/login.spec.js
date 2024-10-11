const { test } = require("../../fixtures/fixtures.js");
import { LoginPage } from "../../pages/login.page.js";
import { expect } from "@playwright/test";

test.describe("Login Tests", () => {
  test("should sign in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillLoginForm("hlulani@icloud.com", "testtest");
    await loginPage.submitLoginForm();

    await page.waitForURL(/\/#\/settings/);
    await expect(page).toHaveURL(/\/#\/settings/);
  });

  test("should show red background by the corner of the field for invalid email", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillLoginForm("example", "testtest");
    await loginPage.checkEmailFieldLineCSS("rgb(203, 63, 55)");
  });

  test("should click the \"Sign in with Apple\" button", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const newPage = await loginPage.clickAppleSignIn();

    await expect(newPage).toHaveURL(
      /client_id=com\.tractive\.apple\.staging\.signin/
    );
  });

  test.skip("should click the \"Sign in with Google\" button", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const newPage = await loginPage.clickGoogleSignIn();

    await page.waitForURL(
      /.*client_id=502569997899-9ptaant4qecvighg4t5430ogepvo4r1a.apps.googleusercontent.com.*/
    );
    await expect(newPage).toHaveURL(
      /.*client_id=502569997899-9ptaant4qecvighg4t5430ogepvo4r1a.apps.googleusercontent.com.*/
    );
  });

  test("should redirect to forgot password page when clicking \"Forgot password?\"", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickForgotPassword();

    await page.waitForURL(/\/#\/forgot/);
    await expect(page).toHaveURL(/\/#\/forgot/);
  });

  test("should disable Sign In button if required fields are not filled", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillLoginForm("hlulani@icloud.com", "");

    const isDisabled = await loginPage.isSignInButtonDisabled();
    expect(isDisabled).toBe(true);
  });
});
