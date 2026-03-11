/**
 * Interface para una entidad galáctica
 */
export interface GalacticEntity {
  name: string;
  originPlanet: string;
}

/**
 * Interface para un Jedi, con su afiliación, nivel de poder y año de formación
 */
export interface JediMaster extends GalacticEntity {
  affiliation: 'República' | 'Imperio' | 'Sith' | 'Independiente';
  powerLevel: number;
  yearOfFormation: number;
}

/**
 * Interface para una nave espacial, con su afiliación y año de construcción
 */
export interface Starship extends GalacticEntity {
  affiliation: 'República' | 'Imperio' | 'Sith' | 'Independiente';
  yearOfConstruction: number;
}

/**
 * Interface para un Holocrón, con su nivel de poder
 */
export interface Holocron extends GalacticEntity {
  powerLevel: number;
}

/**
 * Interfaces para búsqueda de entidades galácticas
 */
export interface SearchByName<T> {
  searchByName(name: string): T[];
}

/**
 * Interfaces para búsqueda por afiliación
 */
export interface SearchByAffiliation<T> {
  searchByAffiliation(affiliation: string): T[];
}

/**
 * Interface para búsqueda por nivel de poder
 */
export interface SearchByPowerLevel<T> {
  searchByPowerLevel(powerLevel: number): T[];
}

/**
 * Interface para búsqueda por año de formación o construcción
 */
export interface SearchByYear<T> {
  searchByYear(year: number): T[];
}

/**
 * Interface para búsqueda por planeta de origen
 */
export interface SearchByOriginPlanet<T> {
  searchByOriginPlanet(planet: string): T[];
}

/**
 * Interface para el registro
 * A aprte de saber añadir entidades y removerlas, extiende la interfaz de nusqeuda, para saber busacr por nombre y planeta
 */
export interface GalacticRegistry<T extends GalacticEntity> extends SearchByName<T>, SearchByOriginPlanet<T> {
  add(item: T): void;
  remove(name: string): void;
}

/**
 * Clase abstracta para una colección galáctica
 */
export abstract class BasicGalacticCollection<T extends GalacticEntity> implements GalacticRegistry<T> {
  protected entities: T[] = [];

  /**
   * Metodo para añadir una entidad a la colección
   * @param entity - entidad a añadir
   * @returns - void
   */
  add(entity: T): void {
    this.entities.push(entity);
  }

  /**
   * Metodo para remover una entidad de la colección por su nombre
   * @param name - nombre de la entidad a remover
   * @returns - void
   */
  remove(name: string): void {
    this.entities = this.entities.filter(entity => entity.name !== name);
  }

  /**
   * Metodo para buscar entidades por su nombre
   * @param name - nombre de la entidad a buscar
   * @returns - array de entidades que coinciden con el nombre dado
   */
  searchByName(name: string): T[] {
    return this.entities.filter(entity => entity.name === name);
  }

  /**
   * Metodo para buscar entidades por su planeta de origen
   * @param planet - planeta de origen de la entidad a buscar
   * @returns - array de entidades que coinciden con el planeta de origen dado
   */
  searchByOriginPlanet(planet: string): T[] {
    return this.entities.filter(entity => entity.originPlanet === planet);
  }

  // abstract searchByAffiliation(affiliation: string): T[];
  // abstract searchByPowerLevel(powerLevel: number): T[];
  // abstract searchByYear(year: number): T[];
}


/**
 * Clase para manejar una coleccion de Jedi
 */
export class JediMasterCollection extends BasicGalacticCollection<JediMaster> implements SearchByAffiliation<JediMaster>, SearchByPowerLevel<JediMaster>, SearchByYear<JediMaster> {
  
  /**
   * Método para buscar Jedi por su afiliación
   * @param affiliation - afiliación de los Jedi a buscar
   * @returns - array de Jedi que coinciden con la afiliación dada
   */
  searchByAffiliation(affiliation: string): JediMaster[] {
    return this.entities.filter(jedi => jedi.affiliation === affiliation);
  }

  /**
   * Método para buscar Jedi por su nivel de poder
   * @param powerLevel - nivel de poder de los Jedi a buscar
   * @returns - array de Jedi que coinciden con el nivel de poder dado
   */
  searchByPowerLevel(powerLevel: number): JediMaster[] {
    return this.entities.filter(jedi => jedi.powerLevel === powerLevel);
  }

  /**
   * Método para buscar Jedi por su año de formación
   * @param year -  año de formación de los Jedi a buscar
   * @returns - array de Jedi que coinciden con el año de formación dado
   */
  searchByYear(year: number): JediMaster[] {
    return this.entities.filter(jedi => jedi.yearOfFormation === year);
  }
}


/**
 * Clase para manejar una coleccion de naves espaciales
 */
export class StarshipCollection extends BasicGalacticCollection<Starship> implements SearchByAffiliation<Starship>, SearchByYear<Starship> {
  
  /**
   * Método para buscar naves espaciales por su afiliación
   * @param affiliation - afiliación de las naves espaciales a buscar
   * @returns -  array de naves espaciales que coinciden con la afiliación dada
   */
  searchByAffiliation(affiliation: string): Starship[] {
    return this.entities.filter(starship => starship.affiliation === affiliation);
  }

  /**
   * Método para buscar naves espaciales por su año de construcción
   * @param year - año de construcción de las naves espaciales a buscar
   * @returns - array de naves espaciales que coinciden con el año de construcción dado
   */
  searchByYear(year: number): Starship[] {
    return this.entities.filter(starship => starship.yearOfConstruction === year);
  }
}


/**
 * Clase para manejar una coleccion de Holocrones
 */
export class HolocronCollection extends BasicGalacticCollection<Holocron> implements SearchByPowerLevel<Holocron> {
  /**
   * Metodo para buscar Holocrones por su nivel de poder
   * @param powerLevel - nivel de poder de los Holocrones a buscar
   * @returns - array de Holocrones que coinciden con el nivel de poder dado
   */
  searchByPowerLevel(powerLevel: number): Holocron[] {
    return this.entities.filter(holocron => holocron.powerLevel === powerLevel);
  }
}   