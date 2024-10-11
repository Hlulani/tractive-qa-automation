import { expect } from "@playwright/test";

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.createAccountLink = page.locator("a[ui-sref=\"^.signup\"]");
    this.firstNameInput = page.locator("input[name=\"firstName\"]");
    this.lastNameInput = page.locator("input[name=\"lastName\"]");
    this.emailInput = page.locator("input[name=\"email\"]");
    this.passwordInput = page.locator("input[name=\"password\"]");
    this.submitButton = page.locator("button[type=\"submit\"]");
    this.checkMark = page.locator("div.tcommon-check__mask");
    this.firstNameError = page
      .locator("tcommon-form-field")
      .filter({ hasText: "First name" })
      .locator("em.tcommon-form-field__message");
    this.lastNameError = page
      .locator("tcommon-form-field")
      .filter({ hasText: "Last name" })
      .locator("em.tcommon-form-field__message");
    this.emailError = page
      .locator("tcommon-form-field")
      .filter({ hasText: "Email" })
      .locator("em.tcommon-form-field__message");
    this.termsLink = page.locator("a[href=\"https://tractive.com/terms\"]");
    this.privacyLink = page.locator("a[href=\"https://tractive.com/privacy\"]");
  }

  async navigateToSignup() {
    await this.createAccountLink.click();
    await this.page.waitForURL(/\/#\/signup/);
  }

  async fillRegistrationForm(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.checkMark.click();
    await this.submitButton.click();
  }

  async verifyFirstNameError(expectedText) {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.firstNameError).toHaveText(expectedText);
  }

  async verifyLastNameError(expectedText) {
    await expect(this.lastNameError).toBeVisible();
    await expect(this.lastNameError).toHaveText(expectedText);
  }

  async verifyEmailError(expectedText) {
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toHaveText(expectedText);
  }

  async verifyTermsRedirect() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.termsLink.click(),
    ]);
    await newPage.waitForLoadState("load");
    await expect(newPage).toHaveURL(
      "https://assets.tractive.com/static/legal/en/terms-of-service.pdf"
    );
  }

  async verifyPrivacyRedirect() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.privacyLink.click(),
    ]);
    await newPage.waitForLoadState("load");
    await expect(newPage).toHaveURL(
      "https://assets.tractive.com/static/legal/en/privacy-policy.pdf"
    );
  }
}
