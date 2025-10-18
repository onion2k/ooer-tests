import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';

test('homepage has expected title and h1', async ({ page, baseURL }) => {
  const homePage = new HomePage(page);
  await homePage.goto(baseURL);

  await expect(homePage.page).toHaveTitle(/Ooer/i);
  await expect(homePage.siteTitle).toHaveText(/Ooer/i);
});
