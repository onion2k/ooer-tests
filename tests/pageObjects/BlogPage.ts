import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class BlogPage {
  readonly navigation: NavigationBar;
  readonly cards: Locator;
  readonly cardTitles: Locator;

  constructor(private readonly page: Page) {
    this.navigation = new NavigationBar(page);
    this.cards = page.locator('.grid-item.blog');
    this.cardTitles = this.cards.locator('.title');
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL, '/blog'));
  }
}
