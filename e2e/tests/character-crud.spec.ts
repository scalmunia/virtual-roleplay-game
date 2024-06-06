import { test, expect } from '@playwright/test';
import { login } from '../use-cases/authentication/login';

import { auth } from '../use-cases/character/auth';

const LOCALHOST_URL: string = 'http://localhost:4200/';

test.beforeEach(async ({ page }) => {
  // Ir a la URL de inicio antes de cada prueba
  await page.goto(LOCALHOST_URL);

  // Llamamar a la función de login pasandole los datos de prueba
  await login(page, 'prueba@prueba.es', 'prueba');

  // Esperar a que se cargue la página de inicio
  await expect(page).toHaveURL(LOCALHOST_URL + 'characters');

  // Llamamar a la función de auth para autenticar con usuario de prueba
  // await auth(page, LOCALHOST_URL);
});

test.describe('Testing Create Character', () => {
  test('should create a new character', async ({ page }) => {

    // Hacer click en el link de nuevo personaje
    await page.click('text=Nuevo personaje');

    // Esperar a que se cargue la página de inicio
    await expect(page).toHaveURL(LOCALHOST_URL + 'create-character');



    // await page.getByRole('link', { name: 'Imagen + Imagen Nuevo' }).click();
    // await page.locator('input[type="file"]').click();
    // await page.locator('input[type="file"]').setInputFiles('H0bc1a0ed018d4483b368e3986b496b0dd.jpg_640x640q90.heic');
    // await page.getByRole('banner').locator('input[type="text"]').click();
    // await page.getByRole('banner').locator('input[type="text"]').fill('Prueba');
    // await page.locator('div').filter({ hasText: /^Nivel1234567891011121314151617181920$/ }).getByRole('combobox').selectOption('2');
    // await page.getByRole('combobox').nth(1).selectOption('barbarian');
    // await page.locator('vrg-ability').filter({ hasText: 'FUERZA' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'FUERZA' }).getByRole('spinbutton').fill('8');
    // await page.locator('vrg-ability').filter({ hasText: 'DESTREZA' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'DESTREZA' }).getByRole('spinbutton').fill('8');
    // await page.locator('vrg-ability').filter({ hasText: 'CONSTITUCIÓN' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'CONSTITUCIÓN' }).getByRole('spinbutton').fill('9');
    // await page.locator('vrg-ability').filter({ hasText: 'INTELECTO' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'INTELECTO' }).getByRole('spinbutton').fill('9');
    // await page.locator('vrg-ability').filter({ hasText: 'SABIDURÍA' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'SABIDURÍA' }).getByRole('spinbutton').fill('8');
    // await page.locator('vrg-ability').filter({ hasText: 'CARISMA' }).getByRole('spinbutton').click();
    // await page.locator('vrg-ability').filter({ hasText: 'CARISMA' }).getByRole('spinbutton').fill('8');
    // await page.getByText('Des', { exact: true }).first().click();
    // await page.getByText('Int', { exact: true }).first().click();
    // await page.getByText('Int', { exact: true }).nth(2).click({
    //     button: 'right'
    //   });
    // await page.getByText('Int', { exact: true }).nth(2).click();
    // await page.getByText('Car', { exact: true }).nth(3).click();
    // await page.getByRole('row', { name: 'Competencia Imagen' }).getByRole('textbox').click();
    // await page.getByRole('row', { name: 'Competencia Imagen' }).getByRole('textbox').fill('asdf');
    // await page.getByRole('row', { name: 'Competencia -1 Imagen' }).getByRole('spinbutton').fill('4');
    // await page.getByLabel('Competencia').check();
    // await page.getByRole('button', { name: 'Imagen' }).click();
    // await page.getByRole('row', { name: 'Competencia Imagen' }).getByRole('textbox').click();
    // await page.getByRole('row', { name: 'Competencia Imagen' }).getByRole('textbox').fill('zxcv');
    // await page.getByRole('row', { name: 'Competencia -1 Imagen' }).getByRole('spinbutton').fill('2');
    // await page.getByText('ATAQUES Y CONJUROSNOMBRECAR.').click();
    // await page.locator('#annotations div').nth(2).click();
    // await page.locator('#annotations div').nth(2).fill('fasdfads asfasdf asdfa sdfasfasd ');
    // await page.getByText('fasdfads asfasdf asdfa').click();
    // await page.locator('.ql-bold').click();
    // await page.getByRole('button', { name: 'Añadir equipo' }).click();
    // await page.getByLabel('NOMBRE DEL OBJETO').click();
    // await page.getByLabel('NOMBRE DEL OBJETO').fill('qwer');
    // await page.locator('vrg-select').filter({ hasText: 'CALIDADSelecciona el tipo de' }).locator('#selectQuality').selectOption('rare');
    // await page.getByPlaceholder('Escribe aquí').click();
    // await page.getByPlaceholder('Escribe aquí').fill('fasdfasgasdg');
    // await page.locator('#mat-mdc-dialog-0 input[type="file"]').click();
    // await page.locator('#mat-mdc-dialog-0 input[type="file"]').setInputFiles('grebas_de_penitente.webp');
    // await page.locator('vrg-select').filter({ hasText: 'Selecciona un atributoPuntos' }).locator('#selectAttributes').selectOption('armor');
    // await page.getByRole('spinbutton').click();
    // await page.getByRole('spinbutton').fill('2');
    // await page.getByRole('button', { name: 'Añadir' }).click();
    // await page.locator('#selectAttributes').nth(3).selectOption('customEffect');
    // await page.getByRole('textbox', { name: 'Efecto' }).click();
    // await page.getByRole('textbox', { name: 'Efecto' }).fill('dafsasdfas');
    // await page.getByRole('button', { name: 'Añadir' }).click();
    // await page.getByRole('combobox').nth(3).selectOption('intelligence');
    // await page.getByPlaceholder('Bonus').nth(3).click();
    // await page.getByPlaceholder('Bonus').nth(3).fill('-1');
    // await page.getByRole('button', { name: 'Añadir' }).click();
    // await page.getByRole('button', { name: 'Guardar' }).click();
    // await page.getByRole('button', { name: 'Crear' }).click();import { test, expect } from '@playwright/test';
  });
});