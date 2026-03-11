/**
 * Clase Paso que representa un paso de una receta de cocina. 
 */
export class Paso {
  /**
   * Constructor de la clase Paso 
   * @param nombre - Nombre del paso de la receta
   * @param duracion - Duración del paso en segundos
   * @param etiquetas - Array de etiquetas que describen el paso.
   * @param opcional - Booleano que indica si el paso es opcional o no
   * @param vecesCompletado - Número de veces que se ha completado el paso (inicialmente 0)
   */
  constructor(nombre: string, duracion: number, etiquetas: string[], opcional: boolean, vecesCompletado: number) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.etiquetas = etiquetas;
    this.esOpcional = opcional;
    this.vecesCompletado = vecesCompletado;
  }
  public nombre: string;
  public duracion: number;
  public etiquetas: string[];
  public esOpcional: boolean;
  public vecesCompletado: number;

}

export class PasoConTemperatura extends Paso {
  constructor(nombre: string, duracion: number, etiquetas: string[], opcional: boolean, vecesCompletado: number, temperatura: number) {
    super(nombre, duracion, etiquetas, opcional, vecesCompletado);
    this.temperatura = temperatura;
  }
  public temperatura: number;
}