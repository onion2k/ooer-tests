import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class HomePage {
  readonly page: Page;
  readonly siteTitle: Locator;
  readonly boxes: Locator;
  readonly navigation: NavigationBar;

  constructor(page: Page) {
    this.page = page;
    this.siteTitle = page.locator('.header__left');
    this.boxes = page.locator('.grid-item');
    this.navigation = new NavigationBar(page);
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL));
  }
}
