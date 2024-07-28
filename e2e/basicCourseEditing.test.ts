import { test, expect } from '@playwright/test';
import { storeAdminCookies } from './utils/storeAdminCookies';

test('can create a new course', async ({ page, browser, context }) => {
  await storeAdminCookies(context);

  await page.goto('http://localhost:3000/browse');

  const adminButton = await page.getByText("Admin");
  expect(adminButton).toHaveCount(1);
  await adminButton.click();
  await page.waitForURL("http://localhost:3000/admin/courses"); // Wait for 1 second
  await page.getByRole("button").getByText("Create course").click();
  await page.waitForURL("http://localhost:3000/admin/courses/new-course"); // Wait for 1 second
  await page.locator("#name-input").fill("Test course name");
  await page.locator("#description-input").fill("Test course description");
  await page.locator("#category-input").fill("Test course category");
});

