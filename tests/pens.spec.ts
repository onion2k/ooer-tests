import { test, expect } from '@playwright/test';
import { PensPage } from './pageObjects/PensPage';

test.describe('pens page', () => {
  let pensPage: PensPage;

  test.beforeEach(async ({ page, baseURL }) => {
    pensPage = new PensPage(page);
    await pensPage.goto(baseURL);
  });

  test('highlights the Pens navigation link', async () => {
    await expect(pensPage.navigation.link('Pens')).toHaveAttribute('aria-current', 'page');
  });

  test('lists multiple pens with titles', async () => {
    const total = await pensPage.cards.count();
    expect(total).toBeGreaterThan(0);

    const titles = await pensPage.cardTitles.allTextContents();
    expect(titles).toContain('Split View Example');
    expect(titles.every((title) => title.trim().length > 0)).toBeTruthy();
  });

  test('Split View Example pen includes descriptive excerpt', async () => {
    const splitViewCard = pensPage.cardByTitle('Split View Example');
    await expect(splitViewCard).toBeVisible();
    await expect(splitViewCard.locator('.excerpt')).toContainText('accessible split view image comparison');
  });
});
