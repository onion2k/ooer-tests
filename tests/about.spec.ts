import { test, expect } from '@playwright/test';
import { AboutPage } from './pageObjects/AboutPage';

test.describe('about page', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page, baseURL }) => {
    aboutPage = new AboutPage(page);
    await aboutPage.goto(baseURL);
  });

  test('highlights the About navigation link', async () => {
    await expect(aboutPage.navigation.link('About')).toHaveAttribute('aria-current', 'page');
  });

  test('shows personal introduction content', async () => {
    await expect(aboutPage.heading).toHaveText('All about me');
    await expect(aboutPage.paragraphContaining('I make web stuff')).toBeVisible();
  });
});
