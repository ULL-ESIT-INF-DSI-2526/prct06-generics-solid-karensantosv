import { Elaborable } from "./elaborable";

/**
 * Tipo de plato que puede ser
 */
export type tipoPlato = "entrante" | "principal" | "guarnición";

/**
 * CLase apara reresentar una receta dulce
 */
export class Salty implements Elaborable<string> {
    private readonly _nombre: string;
    private readonly _pais: string;
    private readonly _tiempo: number;
    private readonly _tipo: tipoPlato;
    /**
     * constructor de la clase Salty
     * @param nombre - nombre de la receta
     * @param pais - pais de origen de la receta
     * @param tiempo - duración de la receta
     * @param tipo - tipo de plato si es "entrante" | "principal" | "guarnición";
     */
    constructor(nombre: string,
                pais: string,
                tiempo: number,
                tipo: tipoPlato
    ) {
        if (nombre !== "") {
            this._nombre = nombre;
        } else {
            console.error('Error');
            this._nombre = "undefined";
        }

        if (pais !== "") {
            this._pais = pais;
        } else {
            console.error('Error');
            this._pais = "undefined";
        }

        if (tiempo >= 0) {
            this._tiempo = tiempo;
        } else {
            console.error('Error');
            this._tiempo = 0;
        }

        // this._nombre = nombre;
        // this._pais = pais;
        // this._tiempo = tiempo;
        this._tipo = tipo;
    }

    /**
     * Getters de la clase
     */
    get nombre() { return this._nombre; }
    get pais() { return this._pais; }
    get tiempo() { return this._tiempo; }
    get tipo() { return this._tipo; }

    /**
     * Método para mostrar la descripcion de la receta
     * @returns - un texto con la descripcion
     */
    desc(): string {
        return `Plato: ${this.nombre}, originaria del país: ${this.pais}, tarda: ${this.tiempo}, y es de tipo: ${this.tipo}`;
    }

    /**
     * Metodo para el tiempo totoal de la duraciónde al receta
     * @returns - tiempo en minutos
     */
    time(): number {
        return this.tiempo;
    }
}