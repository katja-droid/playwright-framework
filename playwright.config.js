const fs = require('node:fs');
const path = require('node:path');
const { defineConfig, devices } = require('@playwright/test');

const envPath = path.join(__dirname, 'playwright', '.env');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: (process.env.BASE_URL || 'https://practicesoftwaretesting.com').replace(/\/+$/, ''),
    testIdAttribute: 'data-test',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
