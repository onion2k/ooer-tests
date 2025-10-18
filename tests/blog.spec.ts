import { test, expect } from '@playwright/test';
import { BlogPage } from './pageObjects/BlogPage';

test.describe('blog page', () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page, baseURL }) => {
    blogPage = new BlogPage(page);
    await blogPage.goto(baseURL);
  });

  test('highlights the Blog navigation link', async () => {
    await expect(blogPage.navigation.link('Blog')).toHaveAttribute('aria-current', 'page');
  });

  test('lists blog posts with visible titles', async () => {
    const cardCount = await blogPage.cards.count();
    expect(cardCount).toBeGreaterThan(0);

    const titles = await blogPage.cardTitles.allTextContents();
    expect(titles.length).toBe(cardCount);
    expect(titles.every((title) => title.trim().length > 0)).toBeTruthy();
  });
});
