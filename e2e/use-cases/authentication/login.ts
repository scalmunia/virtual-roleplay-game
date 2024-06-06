import { Page } from "@playwright/test";

export async function login(page: Page, email: string, password: string) {
  // Rellenar los campos del formulario buscando por la etiqueta
  await page.getByLabel('EMAIL').fill(email);
  await page.getByLabel('PASSWORD').fill(password);

  // Hacer click en el botón de iniciar sesión
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
}