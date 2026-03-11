import { Recetas } from "./receta";

/**
 * Clase Chef que representa a un chef con un nombre, número de seguidores y un recetario que contiene sus recetas.
 */
export class Chef {
  /**
   * Constructor de la clase Chef que inicializa el nombre, número de seguidores y recetario del chef.
   * @param nombre - Nombre del chef
   * @param seguidores - Número de seguidores del chef
   * @param recetario - Array de recetas que forman el recetario del chef, cada receta es una instancia de la clase Recetas
   */
  constructor(nombre: string, seguidores: number, recetario: Recetas[]) {
    this.nombre = nombre;
    this.seguidores = seguidores;
    this.recetario = recetario;
  }
  public nombre: string;
  public seguidores: number;
  public recetario: Recetas[];

}