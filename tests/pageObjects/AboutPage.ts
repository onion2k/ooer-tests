import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './NavigationBar';
import { buildUrl } from './utils';

export class AboutPage {
  readonly navigation: NavigationBar;
  readonly heading: Locator;
  readonly body: Locator;

  constructor(private readonly page: Page) {
    this.navigation = new NavigationBar(page);
    this.body = page.locator('main');
    this.heading = this.body.locator('h1');
  }

  async goto(baseURL?: string): Promise<void> {
    await this.page.goto(buildUrl(baseURL, '/about/'));
  }

  paragraphContaining(text: string): Locator {
    return this.body.getByText(text, { exact: false });
  }
}
