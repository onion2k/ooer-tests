import { test, expect } from '@playwright/test';

test('homepage has expected title and h1', async ({ page, baseURL }) => {
  const targetUrl = baseURL ?? 'https://example.com';
  await page.goto(targetUrl);

  await expect(page).toHaveTitle(/Example Domain/i);
  await expect(page.locator('h1')).toHaveText('Example Domain');
});
