/**
 * Interfaz para un repositorio genérico
 */
export interface Repository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}

/**
 * Interfaz para búsqueda por nombre
 */
export interface SearchByName<T> {
  searchByName(name: string): T[];
}

/**
 * Interfaz para búsqueda por afiliación
 */
export interface SearchByTags<T> {
  searchByTags(tag: string): T[];
}

/**
 * Interfaz para búsqueda por rango de años
 */
export interface SearchByYearRange<T> {
  searchByYearRange(start: number, end: number): T[];
}

