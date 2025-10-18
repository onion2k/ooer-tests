import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class PensPage {
  readonly navigation: NavigationBar;
  readonly cards: Locator;
  readonly cardTitles: Locator;

  constructor(private readonly page: Page) {
    this.navigation = new NavigationBar(page);
    this.cards = page.locator('.grid-item.pens');
    this.cardTitles = this.cards.locator('.title');
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL, '/pens/'));
  }

  cardByTitle(title: string): Locator {
    return this.cards.filter({ has: this.page.locator('.title', { hasText: title }) }).first();
  }

  excerpts(): Locator {
    return this.cards.locator('.excerpt');
  }
}
