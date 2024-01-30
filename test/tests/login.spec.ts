import { test, expect, Page } from '@playwright/test';
import { login } from '../use-cases/authentication/login';

const LOCALHOST_URL = 'http://localhost:4200/';

test.beforeEach(async ({ page }) => {
  // Ir a la URL de inicio antes de cada prueba
  await page.goto(LOCALHOST_URL);
});

test.describe('Testing Login', () => {
  test('should login with valid credentials', async ({ page }) => {
    // Llamamar a la función de login
    await login(page, 'zirze@zirze.es', 'zirze');

    // Esperar a que se cargue la página de inicio
    await expect(page).toHaveURL(LOCALHOST_URL + 'characters');
  });

  test('Should display an error message when the email is missing', async ({ page }) => {
    // Llamamar a la función de login
    await login(page, '', 'zirze');

    const error = await page.getByText('Email no enviado');

    // Esperar que se muestre el mensaje de error
    await expect(error).toBeVisible();
  });

  test('Should display an error message when the password is missing', async ({ page }) => {
    // Llamamar a la función de login
    await login(page, 'zirze@zirze.es', '');

    const error = await page.getByText('Contraseña no enviada');

    // Esperar que se muestre el mensaje de error
    await expect(error).toBeVisible();
  });

  test('Should display an error message when the credentials are invalid', async ({ page }) => {
    // Llamamar a la función de login
    await login(page, 'zirze@zirze.com', 'zirze');

    const error = await page.getByText('Inicio de sesión no válido');

    // Esperar que se muestre el mensaje de error
    await expect(error).toBeVisible();
  });
});

