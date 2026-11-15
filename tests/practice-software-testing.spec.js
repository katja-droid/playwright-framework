const { test, expect } = require('@playwright/test');
const { testData } = require('../playwright/data/test-data');

test('Scenario 1: Search for an exact product by name', async ({ page }) => {
  await page.goto('/');

  const productNames = page.getByTestId('product-name');
  await expect(productNames.first()).toBeVisible();

  await page.getByTestId('search-query').fill(testData.searchTerm);
  await page.getByTestId('search-submit').click();

  await expect
    .poll(
      async () => {
        const names = (await productNames.allTextContents()).map((name) => name.trim());
        return names.length > 0
          && names.every((name) => name.toLowerCase().includes(testData.searchTerm.toLowerCase()));
      },
      { timeout: 10000 },
    )
    .toBe(true);

  const resultNames = (await productNames.allTextContents()).map((name) => name.trim());

  for (const name of resultNames) {
    expect(name.toLowerCase()).toContain(testData.searchTerm.toLowerCase());
  }
});

test('Scenario 2: Sort products by price in descending order', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('sort').selectOption({ label: testData.sortOption });

  const getPrices = async () => {
    const labels = await page.getByTestId('product-price').allTextContents();
    return labels
      .map((label) => Number(label.replace(/[^\d.]/g, '')))
      .filter((price) => Number.isFinite(price));
  };

  await expect
    .poll(async () => {
      const prices = await getPrices();
      return prices.length > 1 && prices.every((price, index) => index === 0 || prices[index - 1] >= price);
    })
    .toBe(true);

  const prices = await getPrices();
  expect(prices[0]).toBe(Math.max(...prices));
});

test('Scenario 3: Successful user sign in with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill(testData.credentials.email);
  await page.getByTestId('password').fill(testData.credentials.password);
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL(/\/account(?:\/|$)/);
  await expect(page.getByTestId('page-title')).toHaveText('My account');
});

test('Scenario 4: View detailed information on the product details page', async ({ page }) => {
  await page.goto('/');

  const inStockProduct = page
    .locator('a.card')
    .filter({ hasNot: page.getByTestId('out-of-stock') })
    .first();
  const productName = (await inStockProduct.getByTestId('product-name').innerText()).trim();

  await inStockProduct.click();

  await expect(page.getByTestId('product-name')).toHaveText(productName);
  await expect(page.getByTestId('product-description')).not.toBeEmpty();
  await expect(page.getByTestId('unit-price')).toHaveText(/\$?\d+(\.\d{2})?/);
  await expect(page.getByTestId('add-to-cart')).toBeEnabled();
});
