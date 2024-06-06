import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';


test.describe(`Creación, visualización, actualización y eliminado de un personaje`, () => {
    test.describe.configure({ mode: 'serial' });
    let page: Page;

    const datos = {
        nombre: 'Derek'
    }

    test.beforeAll(async ({ browser }) => {
        // ARRANGE:
        const context = await browser.newContext();
        page = await context.newPage();

        // Hago login
        // usuario: normal
        // pass: normal
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.describe('Crear un personaje', () => {
        test.beforeAll(async ({ browser }) => {
            // ARRANGE:
            // Ir a la página de nuevo personaje /character/new
        });

        test('Al rellenar los campos correctamente y submitear el formulario, se da de alta el personaje', () => {
            // ACT: Meto los chorrocientos campos

            // ASSERT:
            // expect(EnElListado).toHave(ElPersonajeQueHeCreado)
            // expect(POST a /character/).HallaDado200
        })
    })

    test.describe('Mostrar un personaje', () => {
        test.beforeAll(async ({ browser }) => {
            // ARRANGE:
            // 0. Estoy en listado
            // 1. Busco un botón con el texto datos.nombre (Deerk)
            // 2. Le hago click
            // 3. waitForUrl('/character/*')
        });

        test('Las estadísticas que he introducido son las de los datos', () => {
            // ASSERT:
            // expect(Dato1Nodo).ToHave(datos.dato1)
        })

        //... voy comprobando todo lo que debe aparecer en la ficha en base a los datos que le he proporcionado
    });

    test.describe('Editar el personaje', () => {
        test.beforeAll(async ({ browser }) => {
            // ARRANGE:
            // Clicko en editar
        });

        test('Al clickar en editar, los campos se vuelven editables', () => {
            // ASSERT:
            // expect(NododeAlgunCampo).not.toHave(disabled)
        })

        test('Cambio un dato y pulso guardar', () => {
            const nuevoValor = '2'

            // ACT: 
            // 1. Cambio un dato
            // 2. Pulso guardar

            // ASSERT:
            // expect(NododeAlgunCampo).toHave(disabled)
            // expect(NododeAlgunCampo).toHaveValue(nuevoValor)
        })

        //... voy comprobando todo lo que debe aparecer en la ficha en base a los datos que le he proporcionado
    });

    test.describe('Eliminar un personaje', () => {

    })
});
