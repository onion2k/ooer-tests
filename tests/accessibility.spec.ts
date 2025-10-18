import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';

test.describe('Home page accessibility', () => {
  test.skip('exposes a keyboard-accessible skip link to main content', async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    await homePage.goto(baseURL);

    const skipLink = page.getByRole('link', { name: /skip to main content/i });

    await expect(skipLink).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    await skipLink.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('main#main')).toBeVisible();
  });

  test('defines the primary landmarks for assistive tech users', async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    await homePage.goto(baseURL);

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('marks the current page in the primary navigation', async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    await homePage.goto(baseURL);

    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });
});
