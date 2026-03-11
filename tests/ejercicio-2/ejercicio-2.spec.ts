import { test, describe, expect, beforeAll } from 'vitest';
import { Recetas } from '../../src/ejercicio-2/receta';
import { Paso , PasoConTemperatura} from '../../src/ejercicio-2/paso';
import { Chef } from '../../src/ejercicio-2/chef';
import { ManejarRecetario } from '../../src/ejercicio-2/manejarRecetario';
import { TablePresenter } from '../../src/ejercicio-2/tablepresente';
import { RecipeTimeEstimator } from '../../src/ejercicio-2/recipetime';

describe('Ejercicio 2 - Manejar Recetario', () => {
    let chef1: Chef;
    let chef2: Chef;
    let chef3: Chef;
    let manejador: ManejarRecetario;
    let representar: TablePresenter;
    let estimador: RecipeTimeEstimator;
    beforeAll(() => {
        chef1 = new Chef("Gordon Ramsay", 1000000, [
            new Recetas("Beef Wellington", 2005, [
                new Paso("Preparar la carne", 600, ["carne", "preparación"], false, 0),
                new Paso("Hornear", 1800, ["horno", "cocción"], false, 0),
                new Paso("Reposar", 300, ["reposo"], true, 0)
            ])
        ]);
        chef2 = new Chef("Jamie Oliver", 500000, [
            new Recetas("Pasta al Pesto", 2010, [
                new Paso("Cocer la pasta", 600, ["pasta", "cocción"], false, 0),
                new Paso("Preparar el pesto", 300, ["pesto", "preparación"], false, 0),
                new Paso("Mezclar y servir", 200, ["mezcla", "servir"], false, 0)
            ])
        ]);
        chef3 = new Chef("Alice Waters", 200000, [
            new Recetas("Ensalada de Quinoa", 2015, [
                new Paso("Cocer la quinoa", 600, ["quinoa", "cocción"], false, 0),
                new Paso("Preparar el aderezo", 300, ["aderezo", "preparación"], false, 0),
                new Paso("Mezclar y servir", 200, ["mezcla", "servir"], false, 0)
            ])
        ]);
        manejador = new ManejarRecetario([chef1, chef2, chef3]);
        representar = new TablePresenter();
        estimador = new RecipeTimeEstimator();
    });

    describe('Crear chef', () => {
        test('Debería crear un chef con nombre, seguidores y recetario', () => {
            expect(chef1.nombre).toBe("Gordon Ramsay");
            expect(chef1.seguidores).toBe(1000000);
            expect(chef1.recetario.length).toBe(1);
            expect(chef1).toBeInstanceOf(Chef);
        });
    });

    describe('Crear receta', () => {
        test('Debería crear una receta con nombre, año de publicación y pasos', () => {
            const receta = chef1.recetario[0];
            expect(receta.nombre).toBe("Beef Wellington");
            expect(receta.publicacion).toBe(2005);
            expect(receta.pasos.length).toBe(3);
            expect(receta).toBeInstanceOf(Recetas);
        });

        test('Debería calcular el número de pasos de la receta', () => {
            const receta = chef1.recetario[0];
            expect(estimador.numeroDePasos(receta)).toBe(3);
        });

        test('Debería calcular la duración total de la receta', () => {
            const receta = chef1.recetario[0];
            expect(estimador.duracionTotal(receta)).toEqual([2400, 2700]);
        });

        test('Debería calcular la duración total de la receta sin pasos opcionales', () => {
            const receta = chef2.recetario[0];
            expect(estimador.duracionTotal(receta)).toBe(1100);
        });
    });

    describe('Crear paso', () => {
        test('Debería crear un paso con nombre, duración, etiquetas, opcionalidad y veces completado', () => {
            const paso = chef1.recetario[0].pasos[0];
            expect(paso.nombre).toBe("Preparar la carne");
            expect(paso.duracion).toBe(600);
            expect(paso.etiquetas).toEqual(["carne", "preparación"]);
            expect(paso.esOpcional).toBe(false);
            expect(paso.vecesCompletado).toBe(0);
            expect(paso).toBeInstanceOf(Paso);
        });

        test('Debería crear un paso con temperatura', () => {
            const pasoTemp = new PasoConTemperatura("Hornear", 1800, ["horno", "cocción"], false, 0, 200);
            expect(pasoTemp.nombre).toBe("Hornear");
            expect(pasoTemp.duracion).toBe(1800);
            expect(pasoTemp.etiquetas).toEqual(["horno", "cocción"]);
            expect(pasoTemp.esOpcional).toBe(false);
            expect(pasoTemp.vecesCompletado).toBe(0);
            expect(pasoTemp.temperatura).toBe(200);
            expect(pasoTemp).toBeInstanceOf(PasoConTemperatura);
        });

        test('Debería buscar pasos por nombre', () => {
            expect(manejador.searchByName("Cocer la quinoa").length).toBe(1);
            expect(manejador.searchByName("Cocer la quinoa")[0]).toBeInstanceOf(Paso);
        });
    });

    describe('Manejar recetario', () => {
        test('Debería obtener todos los chefs', () => {
            const chefs = manejador.getAll();
            expect(chefs.length).toBe(3);
            expect(chefs[0].nombre).toBe("Gordon Ramsay");
        });

        test('Debería buscar por nombre y encontrar chefs, recetas y pasos', () => {
            const resultados = manejador.searchByName("Beef Wellington");
            expect(resultados.length).toBe(1);
            expect(resultados[0]).toBeInstanceOf(Recetas);
            expect(resultados[0].nombre).toBe("Beef Wellington");
        });

        test('Debería buscar por etiquetas y encontrar pasos', () => {
            const resultados = manejador.searchByTags("cocción");
            expect(resultados.length).toBe(3);
            expect(resultados[0]).toBeInstanceOf(Paso);
            expect(resultados[0].etiquetas).toContain("cocción");
        });

        test('debe busacr por le minimo de seguidores y encontrar chefs', () => {
            const resultados = manejador.searchByMinFollowers(300000);
            expect(resultados.length).toBe(2);
            expect(resultados[0]).toBeInstanceOf(Chef);
            expect(resultados[0].seguidores).toBeGreaterThanOrEqual(300000);
        });

        test('debe añadir un nuevo chef al recetario', () => {
            const nuevoChef = new Chef("New Chef", 10000, []);
            manejador.add(nuevoChef);
            const chefs = manejador.getAll();
            expect(chefs.length).toBe(4);
            expect(chefs[3].nombre).toBe("New Chef");
        });
        
        test('debe eliminar un chef del recetario', () => {
            expect(manejador.getAll().length).toBe(4);
            manejador.remove("New Chef");
            expect(manejador.getAll().length).toBe(3);
            expect(manejador.getAll().find(c => c.nombre === "New Chef")).toBeUndefined();
        });

        test('debe mostrar el ide de un chef', () => {
            const chef = manejador.getById("Gordon Ramsay");
            expect(chef).toBeDefined();
            expect(chef?.nombre).toBe("Gordon Ramsay");
        });

        test('debe buscar por opcionalidad y encontrar pasos', () => {
            const resultados = manejador.searchByOptionality(true);
            expect(resultados.length).toBe(1);
            expect(resultados[0]).toBeInstanceOf(Paso);
            expect(resultados[0].esOpcional).toBe(true);
        });

        test('debe buscar por rango de años y encontrar recetas', () => {
            const resultados = manejador.searchByYearRange(2000, 2010);
            expect(resultados.length).toBe(2);
            expect(resultados[0]).toBeInstanceOf(Recetas);
            expect(resultados[0].publicacion).toBeGreaterThanOrEqual(2000);
            expect(resultados[0].publicacion).toBeLessThanOrEqual(2010);
        });
    });

    describe('TablePresenter', () => {
        test('Debería mostrar datos en formato tabla', () => {
            const data = [
                { nombre: "Gordon Ramsay", seguidores: 1000000 },
                { nombre: "Jamie Oliver", seguidores: 500000 }
            ];
            representar.showData(data);
        });

        test('Debería mostrar mensaje cuando no hay datos para mostrar', () => {
            representar.showData([]);
        });

        test('no deberia dar error al mostrar datos vacios', () => {
            expect(() => representar.showData([])).not.toThrow();
        });
    });
});