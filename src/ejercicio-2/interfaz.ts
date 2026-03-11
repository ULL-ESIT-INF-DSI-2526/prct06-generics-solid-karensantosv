export interface Repository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}

export interface SearchByName<T> {
  searchByName(name: string): T[];
}

export interface SearchByTags<T> {
  searchByTags(tag: string): T[];
}

export interface SearchByYearRange<T> {
  searchByYearRange(start: number, end: number): T[];
}

