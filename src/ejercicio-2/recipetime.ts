import { Recetas, rango } from "./receta";

/**
 * Clase RecipeTimeEstimator que se encarga de estimar el tiempo total de una receta.
 */
export class RecipeTimeEstimator {
  /**
   * Método para calcular el número de pasos de la receta
   * @returns - Número de pasos de la receta
   */
  numeroDePasos(receta: Recetas): number {
    return receta.pasos.length;
  }

  /**
   * Método para calcular la duración total de la receta.
   * @returns - Duración total de la receta.
   */
  duracionTotal(receta: Recetas): number | rango {
    let max: number = 0;
    let rang: rango = [0, 0];
    let op: boolean = false;
    receta.pasos.forEach((el) => {
      if (el.esOpcional) {
        op = true;
      }
    });
    if (op) {
      receta.pasos.forEach((el) => {
        if (!el.esOpcional) {
          rang[0] += el.duracion;
        } 
        rang[1] += el.duracion;
      });
      return rang;
    } else {
      receta.pasos.forEach((el) => {
        max += el.duracion;
      });
      return max;
    }
  }
}
