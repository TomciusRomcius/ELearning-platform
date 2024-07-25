import { connectToDb } from '@/backend/utils/connectToDb';
import { test, expect } from '@playwright/test';


test('can complete auth flow', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/sign-up');
  await expect (page.getByText("Sign in!")).toBeDefined;
  await page.locator("#email-input").fill("coolemail@gmail.com");
  await page.locator("#password-input").fill("strong.password");
  await page.locator("#repeat-password-input").fill("strong.password");
  await page.getByRole("button").getByText("Sign up").first().click();
  await page.waitForTimeout(5000);
  expect (page.url()).toBe("http://localhost:3000/auth/sign-in");
  await page.locator("#email-input").fill("coolemail@gmail.com");
  await page.locator("#password-input").fill("strong.password");
  await page.getByRole("button").getByText("Sign in").first().click();
  await page.waitForTimeout(5000);
  expect (page.url()).toBe("http://localhost:3000/my-courses");
});

