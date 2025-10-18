import { test, expect } from '@playwright/test';
import { ExperimentsPage } from './pageObjects/ExperimentsPage';

test.describe('experiments page', () => {
  let experimentsPage: ExperimentsPage;

  test.beforeEach(async ({ page, baseURL }) => {
    experimentsPage = new ExperimentsPage(page);
    await experimentsPage.goto(baseURL);
  });

  test('renders multiple experiments', async () => {
    const total = await experimentsPage.cards.count();
    expect(total).toBeGreaterThan(0);
  });

  test('Disco Ducks experiment shows an image background', async () => {
    const disco = experimentsPage.cardByTitle('Disco Ducks');
    await expect(disco).toBeVisible();

    const backgroundImage = await experimentsPage.backgroundImage('Disco Ducks');
    expect(backgroundImage).toContain('disco');
    expect(backgroundImage).not.toBe('none');
  });

  test('Crispy experiment displays the correct description', async () => {
    const crispy = experimentsPage.cardByTitle('Crispy');
    await expect(crispy).toBeVisible();
    await expect(crispy).toContainText('Crispy is an image gallery');
    await expect(crispy).toContainText('tiny segment of an image');
  });
});
