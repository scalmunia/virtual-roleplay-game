import { Page, expect } from "@playwright/test";
import { login } from "../authentication/login";

export async function auth(page: Page, LOCALHOST_URL: string) {
  // Llamamar a la función de login
  await login(page, 'prueba@prueba.es', 'prueba');

  // Esperar a que se cargue la página de inicio
  await expect(page).toHaveURL(LOCALHOST_URL + 'characters');
}