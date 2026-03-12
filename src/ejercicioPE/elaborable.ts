/**
 * Interfaz que establece todo lo que debe cumplir un elaborable
 */
export interface Elaborable<T> {
    desc(): T;
    time(): number;
}