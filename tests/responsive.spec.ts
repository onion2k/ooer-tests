import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
} as const;

test.describe('Home page responsive design', () => {
  test('declares a responsive viewport meta tag', async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    await homePage.goto(baseURL);

    const viewportMeta = page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toHaveCount(1);

    const content = await viewportMeta.first().getAttribute('content');
    expect(content, 'viewport meta should declare responsive settings').not.toBeNull();
    expect(content ?? '').toMatch(/width=device-width/i);
    expect(content ?? '').toMatch(/initial-scale\s*=\s*1/i);
  });

  for (const [label, size] of Object.entries(VIEWPORTS)) {
    test(`does not overflow horizontally on a ${label} viewport`, async ({ page, baseURL }) => {
      const homePage = new HomePage(page);

      await page.setViewportSize(size);
      await homePage.goto(baseURL);

      const overflow = await page.evaluate(() => {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const docOverflow = document.documentElement.scrollWidth - viewportWidth;
        const bodyOverflow = document.body.scrollWidth - viewportWidth;
        return Math.max(docOverflow, bodyOverflow, 0);
      });

      expect(
        overflow,
        `horizontal overflow should be eliminated on ${label} viewport`,
      ).toBeLessThanOrEqual(2);
    });
  }

  test('grid boxes stack on mobile and form columns on desktop', async ({ page, baseURL }) => {
    const homePage = new HomePage(page);

    await page.setViewportSize(VIEWPORTS.mobile);
    await homePage.goto(baseURL);

    const mobileLeftOffsets = await homePage.boxes.evaluateAll((nodes) =>
      nodes.slice(0, 2).map((node) => Math.round(node.getBoundingClientRect().left)),
    );

    expect(mobileLeftOffsets.length).toBeGreaterThanOrEqual(2);
    expect(
      Math.abs(mobileLeftOffsets[0] - mobileLeftOffsets[1]),
      'first two boxes should stack vertically on mobile',
    ).toBeLessThanOrEqual(5);

    await page.setViewportSize(VIEWPORTS.desktop);
    await homePage.goto(baseURL);

    const desktopLeftOffsets = await homePage.boxes.evaluateAll((nodes) =>
      nodes.slice(0, 2).map((node) => Math.round(node.getBoundingClientRect().left)),
    );

    expect(desktopLeftOffsets.length).toBeGreaterThanOrEqual(2);
    expect(
      Math.abs(desktopLeftOffsets[0] - desktopLeftOffsets[1]),
      'first two boxes should form distinct columns on desktop',
    ).toBeGreaterThanOrEqual(80);
  });
});
