import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.locator("button.tcommon-button--cta");
    this.appleSignInButton = page.locator(
      'button:has-text("Sign in with Apple")'
    );
    this.googleIframe = page.frameLocator(
      'iframe[title="Schaltfläche „Über Google anmelden“"]'
    );
    this.forgotPasswordLink = page.locator('a:has-text("Forgot password?")');
    this.emailFieldLine = page.locator("div.tcommon-form-field__line").nth(0);
  }

  async fillLoginForm(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitLoginForm() {
    await this.signInButton.dispatchEvent("click");
  }

  async checkEmailFieldLineCSS(expectedColor) {
    await expect(this.emailFieldLine).toHaveCSS(
      "background-color",
      expectedColor
    );
  }

  async clickAppleSignIn() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.appleSignInButton.dispatchEvent("click"),
    ]);
    await newPage.waitForLoadState("load");
    return newPage;
  }

  async clickGoogleSignIn() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.googleIframe.getByLabel("Sign in with Google").click(),
    ]);
    await newPage.waitForLoadState("load");
    return newPage;
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.dispatchEvent("click");
  }

  async isSignInButtonDisabled() {
    const button = await this.page.$('tcommon-button[type="submit"]');
    return (await button.getAttribute("disabled")) === "disabled";
  }
}
