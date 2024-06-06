import { test, expect } from '@playwright/test';
import { auth } from '../use-cases/character/auth';

const LOCALHOST_URL: string = 'http://localhost:4200/';

test.beforeEach(async ({ page }) => {
  // Ir a la URL de inicio antes de cada prueba
  await page.goto(LOCALHOST_URL);

  // Llamamar a la función de auth para autenticar
  await auth(page, LOCALHOST_URL);
});

test.describe('Testing Character List', () => {
  test('should show the characters list', async ({ page }) => {

    // Hacer click en el link de nuevo personaje
    // await page.click('text=Nuevo personaje');

    // Esperar a que se cargue la página de inicio
    // await expect(page).toHaveURL(LOCALHOST_URL + 'create-character');
  });
});