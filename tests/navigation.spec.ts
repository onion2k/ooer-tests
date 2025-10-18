import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';

test('navigation menu exposes Blog, Experiments, and Pens links', async ({ page, baseURL }) => {
  const homePage = new HomePage(page);
  await homePage.goto(baseURL);

  const navigation = homePage.navigation;
  await expect(navigation.link('Blog')).toBeVisible();
  await expect(navigation.link('Experiments')).toBeVisible();
  await expect(navigation.link('Pens')).toBeVisible();
});
