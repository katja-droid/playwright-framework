# Playwright browser tests

The four specs in `tests/practice-software-testing.spec.js` mirror the first
four scenarios in `wdio/src/tests/chai-interfaces.tests.js`. Search, sort, and
sign-in data come from `wdio/data/test-data.js` and `wdio/.env` when the WDIO
environment is complete. Without that local environment, search and sort use
the feature's defaults and sign-in is skipped.

## Setup

```powershell
npm ci
npx playwright install chrome firefox webkit
```

The `safari` project runs Playwright's WebKit engine. Native Safari is not
available for Playwright on Windows.

## Run

Run all browser projects, with two workers:

```powershell
npm test
```

Run a single browser project:

```powershell
npm run test:chrome
npm run test:firefox
npm run test:safari
```

Tests run headlessly by default and each failed test is retried twice before
being marked failed. The existing `wdio/.env` is loaded automatically and
ignored by Git. `BASE_URL` can be set in the shell to override the default
Practice Software Testing URL.

The HTML report is written to `playwright-report/`.
