import { Elaborable } from "./elaborable";

/**
 * Tipo para representar el ranogo de dificultad
 */
export type rango = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Interface para representar una propiedad
 */
// export interface Propiedades {
//     nombre: string;
//     dificultad: rango;
// }


/**
 * Clase para represnetar un objeto que tiene propiedades de un salado
 */
export class Propiedades {
    /**
     * Constructor de la clase Propiedades
     * @param nombre - nombre de la propiedad
     * @param dificultad -  dificultad
     */
    constructor(public nombre: string, public dificultad: rango) {}
}

/**
 * Clase para represnetar recetas saladas
 */
export class Sweet implements Elaborable<Propiedades> {

    private readonly _nombre: string
    private readonly _dificultad: rango
    private readonly _tiempopreparacion: number
    private readonly _tiempohorneado: number
    private readonly _tiemporefigeracion: number

    /**
     * Constructor de la clase
     * @param _nombre - el nombre de la receta
     * @param _dificultad - dificultadde la receta
     * @param _tiempopreparacion - timepod e preparacion de la receta
     * @param _tiempohorneado - tiempo de horneado de la receta
     * @param _tiemporefigeracion - timepo de refrigerscion de la receta
     */
    constructor(nombre: string,
                dificultad: rango,
                tiempopreparacion: number,
                tiempohorneado: number,
                tiemporefigeracion: number
    ) {
        if (nombre !== "") {
            this._nombre = nombre;
        } else {
            console.error('Error');
            this._nombre = "undefined";
        }

        if (tiempohorneado >= 0) {
            this._tiempohorneado = tiempohorneado;
        } else {
            console.error('Error');
            this._tiempohorneado = 0;
        }

        if (tiempopreparacion >= 0) {
            this._tiempopreparacion = tiempopreparacion;
        } else {
            console.error('Error');
            this._tiempopreparacion = 0;
        }

        if (tiemporefigeracion >= 0) {
            this._tiemporefigeracion = tiemporefigeracion;
        } else {
            console.error('Error');
            this._tiemporefigeracion = 0;
        }

        this._dificultad = dificultad;
    }

    /**
     * Getters de la clase
     */
    get nombre() { return this._nombre; }
    get dificultad() { return this._dificultad; }
    get tiempopreparacion() { return this._tiempopreparacion; }
    get tiempohorneado() { return this._tiempohorneado; }
    get tiemporefigeracion() { return this._tiemporefigeracion; }

    /**
     * Metodo para mmostrar la descripcion de una receta
     * @returns - Objeto propiedades
     */
    desc(): Propiedades {
        return new Propiedades(this.nombre, this.dificultad);
    }

    /**
     * Metodo para el tiempo totoal de la duraciónde al receta
     * @returns - tiempo en minutos
     */
    time(): number {
        return this.tiempohorneado + this.tiempopreparacion + this.tiemporefigeracion;
    }
}