import { Paso } from "./paso";

/**
 * tipo que representa el rango de duración de la receta en caso de que haya pasos opcionales.
 */
export type rango = [number, number];

/**
 * Clase Recetas que representa una receta de cocina. Tiene un nombre, una fecha de publicación y un array de pasos.
 */
export class Recetas {
  /**
   * Constructor de la clase Recetas que inicializa el nombre, fecha de publicación y pasos de la receta.
   * @param nombre - Nombre de la receta
   * @param publicacion - Año de publicación de la receta
   * @param pasos - Array de pasos que forman la receta, cada paso es una instancia de la clase Paso
   */
  constructor(nombre: string, publicacion: number, pasos: Paso[]) {
    this.nombre = nombre;
    this.publicacion = publicacion;
    this.pasos = pasos;
  }
  public nombre: string;
  public publicacion: number;
  public pasos: Paso[];
}
