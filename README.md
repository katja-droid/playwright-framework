# Playwright browser tests

The four specs in `tests/practice-software-testing.spec.js` cover product
search, sorting, sign-in, and product details. Test data is loaded from
`playwright/.env`; all required variables are listed in
`playwright/data/test-data.js`.

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
being marked failed. The local `playwright/.env` file is loaded automatically
and ignored by Git. It must define `TEST_EMAIL`, `TEST_PASSWORD`,
`SEARCH_TERM`, `SORT_OPTION`, `ADDRESS_STATE`, `ADDRESS_POSTAL_CODE`,
`ADDRESS_HOUSE_NUMBER`, `ADDRESS_COUNTRY`, and `PAYMENT_METHOD`.
`BASE_URL` can be set in the shell to override the default Practice Software
Testing URL.

The HTML report is written to `playwright-report/`.
