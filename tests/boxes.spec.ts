import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';

test('homepage shows the expected number of boxes', async ({ page, baseURL }) => {
  const homePage = new HomePage(page);
  await homePage.goto(baseURL);

  await expect(homePage.boxes).toHaveCount(29);
});
