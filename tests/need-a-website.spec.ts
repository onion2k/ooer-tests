import { test, expect } from '@playwright/test';
import { NeedWebsitePage } from './pageObjects/NeedWebsitePage';

test.describe('need a website page', () => {
  let needWebsitePage: NeedWebsitePage;

  test.beforeEach(async ({ page, baseURL }) => {
    needWebsitePage = new NeedWebsitePage(page);
    await needWebsitePage.goto(baseURL);
  });

  test('highlights the Need A Website navigation link', async () => {
    await expect(needWebsitePage.navigation.link('Need A Website?')).toHaveAttribute('aria-current', 'page');
  });

  test('presents headline and supporting sections', async () => {
    await expect(needWebsitePage.heading).toHaveText('Need a website?');
    await expect(needWebsitePage.subHeadings).toContainText(['About the websites I build', 'Still interested?']);
  });

  test('offers contact link via email', async () => {
    await expect(needWebsitePage.contactLink).toHaveAttribute('href', 'mailto:chris@usablehq.com');
  });
});
