import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class ExperimentsPage {
  readonly navigation: NavigationBar;
  readonly cards: Locator;

  constructor(private readonly page: Page) {
    this.navigation = new NavigationBar(page);
    this.cards = page.locator('.grid-item.experiment');
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL, '/experiments'));
  }

  cardByTitle(title: string): Locator {
    const titleLocator = this.page.locator('.title', { hasText: title });
    return this.cards.filter({ has: titleLocator }).first();
  }

  async backgroundImage(title: string): Promise<string> {
    const card = this.cardByTitle(title);
    await card.waitFor();
    return card.evaluate((element) => getComputedStyle(element).backgroundImage);
  }
}
