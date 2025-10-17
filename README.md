# Playwright End-to-End Tests

This project uses [Playwright](https://playwright.dev/) to run end-to-end checks against a website.

## Prerequisites

- Node.js 18+ (Playwright supports LTS releases)
- npm (bundled with Node.js)

## Setup

```bash
npm install
npx playwright install
```

`npx playwright install` only needs to run once per machine (or whenever you want to download updated browser binaries).

## Running the tests

```bash
npm test
```

Helpful variants:

- `npm run test:headed` – open browsers with UI for debugging
- `npm run test:report` – view the most recent HTML report

## Targeting your site

The default test points at `https://example.com`. Provide your own site URL via `BASE_URL`:

```bash
BASE_URL="https://your-site.example" npm test
```

The sample test lives in `tests/example.spec.ts`. Duplicate or replace it with scenarios specific to your application.
