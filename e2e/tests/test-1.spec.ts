import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.getByLabel('EMAIL').click();
  await page.getByLabel('EMAIL').fill('prueba@prueba.es');
  await page.getByLabel('EMAIL').press('Tab');
  await page.getByLabel('PASSWORD').fill('prueba');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Imagen Imagen Markus Nivel 4' }).click();

});