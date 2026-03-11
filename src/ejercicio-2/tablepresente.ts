import { Repository } from "./interfaz";
import { ManejarRecetario } from "./manejarRecetario";
import { Chef } from "./chef";
import { Recetas } from "./receta";
import { Paso } from "./paso";

/**
 * Clase para presentar datos en formato tabla.
 */
export class TablePresenter {
  
  /**
   * Método para mostrar los datos en formato tabla
   * @param data - Array de datos a mostrar en la tabla
   * @returns - void
   */
  public showData<T>(data: T[]): void {
    if (data && data.length > 0) {
      console.table(data);
    } else {
      console.log("No hay resultados para mostrar.");
    }
  }
}

// let listaDeChefs: Chef[] = [
//     new Chef("Gordon Ramsay", 1000000, [
//         new Recetas("Beef Wellington", 2005, [
//             new Paso("Preparar la carne", 600, ["carne", "preparación"], false, 0),
//             new Paso("Hornear", 1800, ["horno", "cocción"], false, 0),
//             new Paso("Reposar", 300, ["reposo"], true, 0)
//         ])
//     ]),
//     new Chef("Jamie Oliver", 500000, [
//         new Recetas("Pasta al Pesto", 2010, [
//             new Paso("Cocer la pasta", 600, ["pasta", "cocción"], false, 0),
//             new Paso("Preparar el pesto", 300, ["pesto", "preparación"], false, 0),
//             new Paso("Mezclar y servir", 200, ["mezcla", "servir"], false, 0)
//         ])
//     ]),
//     new Chef("Alice Waters", 200000, [
//         new Recetas("Ensalada de Quinoa", 2015, [
//             new Paso("Cocer la quinoa", 600, ["quinoa", "cocción"], false, 0),
//             new Paso("Preparar el aderezo", 300, ["aderezo", "preparación"], false, 0),
//             new Paso("Mezclar y servir", 200, ["mezcla", "servir"], false, 0)
//         ])
//     ])  
// ];

// const manejador = new ManejarRecetario(listaDeChefs);

// const presentador = new TablePresenter();

// console.log("--- TODOS LOS CHEFS ---");
// presentador.showData(manejador.getAll());


// console.log("--- BÚSQUEDA: Pasos con la etiqueta 'cocción' ---");
// const pasosCoccion = manejador.searchByTags("cocción");
// presentador.showData(pasosCoccion); 

// console.log("--- BÚSQUEDA: Recetas entre 2005 y 2012 ---");
// const recetasRango = manejador.searchByYearRange(2005, 2012);
// presentador.showData(recetasRango);

// console.log("--- BÚSQUEDA: Pasos opcionales ---");
// const opcionales = manejador.searchByOptionality(true);
// presentador.showData(opcionales);