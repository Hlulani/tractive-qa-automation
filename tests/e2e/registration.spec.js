import { test } from "../../fixtures/fixtures.js";
import { expect } from "@playwright/test";
import { RegistrationPage } from "../../pages/registration.page.js";
import { faker } from "@faker-js/faker";

//dotenv.config();
test.describe("Registration Form Tests", () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password(12, true);
  const email = `${firstName}@icloud.com`;

  test('should redirect to the signup page after clicking "Create Account"', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await expect(page).toHaveURL(/\/#\/signup/);
  });

  test("should successfully register with valid details - happy path", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm(
      firstName,
      lastName,
      email,
      password
    );
    await registrationPage.submitForm();
    await page.waitForURL(/\/#\/activation\/device/);
    await expect(page).toHaveURL(/\/#\/activation\/device/);
  });

  test("should show error for missing first name", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm("", lastName, email, password);
    await registrationPage.verifyFirstNameError("This field is required.");
  });

  test("should show error for missing last name", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm(firstName, "", email, password);
    await registrationPage.verifyLastNameError("This field is required.");
  });

  test("should show error for empty email address field", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm(
      firstName,
      lastName,
      "",
      password
    );
    await registrationPage.verifyEmailError("This field is required.");
  });

  test("should show error for invalid email format", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm(
      firstName,
      lastName,
      "invalid-email",
      password
    );
    await registrationPage.verifyEmailError("The email address is invalid.");
  });

  test("should disable Create Account button if required fields are not filled", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.fillRegistrationForm(firstName, lastName, "", "");
    const button = page.locator('tcommon-button[type="submit"]');
    const isDisabled = await button.getAttribute("disabled");
    expect(isDisabled).toBe("disabled");
  });

  test("should redirect to Terms & Conditions when clicked", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.verifyTermsRedirect();
  });

  test("should redirect to Privacy Policy when clicked", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignup();
    await registrationPage.verifyPrivacyRedirect();
  });
});
