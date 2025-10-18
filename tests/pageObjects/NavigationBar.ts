import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  readonly root: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('nav');
  }

  link(name: string, options?: { exact?: boolean }): Locator {
    return this.root.getByRole('link', { name, exact: options?.exact ?? true });
  }

  links(): Locator {
    return this.root.getByRole('link');
  }
}
