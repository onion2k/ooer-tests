import { test, expect, Page } from '@playwright/test';

type NavigationMetrics = {
  loadEventEnd: number | null;
  domInteractive: number | null;
  transferSize: number | null;
  totalBytes: number;
};

const PERFORMANCE_BUDGET = {
  loadEventEnd: 4000,
  domInteractive: 2500,
  totalBytes: 128_000,
};

async function collectNavigationMetrics(page: Page, baseURL?: string): Promise<NavigationMetrics> {
  await page.goto(baseURL ?? 'https://ooer.com', { waitUntil: 'load' });

  const metrics = await page.evaluate(() => {
    const [navigationEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    const resourceBytes = resourceEntries.reduce((total, entry) => {
      const size = entry.transferSize || entry.encodedBodySize || entry.decodedBodySize || 0;
      return total + size;
    }, 0);

    const navigationTransfer = navigationEntry?.transferSize || 0;

    return {
      loadEventEnd: navigationEntry?.loadEventEnd ?? null,
      domInteractive: navigationEntry?.domInteractive ?? null,
      transferSize: navigationEntry?.transferSize ?? null,
      totalBytes: resourceBytes + navigationTransfer,
    } as NavigationMetrics;
  });

  return metrics;
}

test.describe('Home page performance budgets', () => {
  test('load event occurs within budget', async ({ page, baseURL }) => {
    const metrics = await collectNavigationMetrics(page, baseURL);

    expect(metrics.loadEventEnd, 'load event did not complete').not.toBeNull();
    expect(metrics.loadEventEnd ?? Number.POSITIVE_INFINITY).toBeLessThan(PERFORMANCE_BUDGET.loadEventEnd);
  });

  test('time to interactive stays within target', async ({ page, baseURL }) => {
    const metrics = await collectNavigationMetrics(page, baseURL);

    expect(metrics.domInteractive, 'domInteractive was not reported').not.toBeNull();
    expect(metrics.domInteractive ?? Number.POSITIVE_INFINITY).toBeLessThan(PERFORMANCE_BUDGET.domInteractive);
  });

  test('page weight stays under budget', async ({ page, baseURL }) => {
    const metrics = await collectNavigationMetrics(page, baseURL);

    expect(metrics.totalBytes).toBeLessThan(PERFORMANCE_BUDGET.totalBytes);
  });
});
