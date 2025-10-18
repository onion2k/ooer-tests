import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class NeedWebsitePage {
  readonly navigation: NavigationBar;
  readonly main: Locator;
  readonly heading: Locator;
  readonly subHeadings: Locator;
  readonly contactLink: Locator;

  constructor(private readonly page: Page) {
    this.navigation = new NavigationBar(page);
    this.main = page.locator('main');
    this.heading = this.main.locator('h1');
    this.subHeadings = this.main.locator('h2');
    this.contactLink = this.main.getByRole('link', { name: 'chris@usablehq.com' });
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL, '/need-a-website/'));
  }
}
