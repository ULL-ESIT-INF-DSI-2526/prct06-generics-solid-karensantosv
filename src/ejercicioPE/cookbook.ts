import { Elaborable } from "./elaborable";

/**
 * Clase que representa un recetario
 */
export class CookBook<T extends Elaborable<unknown>> {
    /**
     * Constructor de la clase REcetario
     * @param _recet - Conjunto de recetas con el que cuenta el recetario
     */
    constructor(private _recet: T[]) {}

    /**
     * Getter de la clase
     */
    get recet() { return this._recet; }

    /**
     * Setter de la clase
     */
    set recet(m) { this._recet = m; }

    /**
     * Método para añadir un tipo de receta elaborable al recetario
     * @param r - Un ejemplo que se quiera añadir
     * @returns - void
     */
    add(r: T): void {
        this.recet.push(r);
    }

    /**
     * Método para remover un elemento de recetario
     * @param r - ELmeneto que se quiere remover
     * @returns - void
     */
    remove(r: T): void {
        this.recet = this.recet.filter((el) => el !== r);
    }

    /**
     * Método para retonar la receta situada en el indice dado
     * @param i - posicion de la receta, indice
     * @returns - El elemento de la receta
     */
    get(i: number): T | undefined {
        if (i >= 0 && i < this.recet.length) {
            return this.recet[i];
        }
        return undefined;
    }

    /**
     * Método que devuelve el tamaño del recetario
     * @returns - el tamañoo del recetario
     */
    size(): number {
        return this.recet.length;
    }

    /**
     * Método para filtrar una receta de acuerdo a un predicado lógico
     * @param pred - Predicado que se añade para filtrar
     * @returns - Un nuevo recetario pero que solo con lo seleccionado por el predicado
     */
    filter(pred: (el: T) => boolean): T[] {
        return this.recet.filter(pred);
    }

    /**
     * Método que calcula el tiempo medio de toas las recetas
     * @returns - timepo medio de preparacion de todas las recetas del recetario
     */
    avgTime(): number {
        let res: number = 0;
        this.recet.forEach((el) => {
            res += el.time();
        });
        return res / this.recet.length;
    }
}