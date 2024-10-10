import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('login and buy pizza', async ({page}) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('combobox').selectOption('1');
  await expect(page.getByRole('link', { name: 'Image Description Crusty A' })).toBeVisible();
  await expect(page.locator('form')).toContainText('Veggie');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByRole('heading')).toContainText('Here is your JWT Pizza!');
  await page.getByRole('button', { name: 'Verify' }).click();
})

