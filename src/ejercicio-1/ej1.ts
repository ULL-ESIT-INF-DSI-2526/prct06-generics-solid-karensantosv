/**Ejercicio 1 - La academia Jedi
Imagine que tiene que diseñar el modelo de datos de una plataforma de gestión de una base de datos galáctica para una academia Jedi. A través del archivo central se puede acceder a diferentes tipos de recursos del universo: maestros Jedi, naves espaciales y holocrones (artefactos que almacenan conocimiento).

Defina una interfaz genérica GalacticRegistry<T> que especifique las propiedades y métodos con los que debería contar una colección concreta de entidades (por ejemplo, una colección de naves espaciales). También deberían definirse métodos de búsqueda que permitan obtener listados en función de distintos criterios:

Por nombre.
Por afiliación (República, Imperio, Sith, Independiente).
Por nivel de poder / clase.
Por año de construcción o formación.
Por planeta de origen.
Defina una clase abstracta genérica BasicGalacticCollection<T> que implemente dicha interfaz genérica.

En esta clase podrá implementar la lógica común (almacenamiento interno, inserción, eliminación, búsqueda básica por nombre, etc.).
Otros métodos más específicos deberán permanecer como abstractos, para obligar a que sean definidos en las subclases correspondientes.
Extienda la clase abstracta anterior para obtener subclases que modelen cada uno de los tres tipos de colecciones:

JediMasterCollection
StarshipCollection
HolocronCollection
Aplique los principios SOLID, prestando especial atención al diseño de la interfaz GalacticRegistry<T>. Si considera que la interfaz resulta demasiado extensa o con responsabilidades heterogéneas, divídala en interfaces genéricas más pequeñas (por ejemplo, SearchByAffiliation<T>, SearchByOriginPlanet<T>, PowerLevelQueryable<T>, etc.), con el objetivo de cumplir el principio Interface Segregation. Sería deseable un diseño que favorezca la extensibilidad, permitiendo añadir en el futuro nuevas entidades (por ejemplo, droides o especies alienígenas) sin modificar las clases existentes. 
*/

export interface GalacticEntity {
  name: string;
  originPlanet: string;
}

export interface JediMaster extends GalacticEntity {
  affiliation: 'República' | 'Imperio' | 'Sith' | 'Independiente';
  powerLevel: number;
  yearOfFormation: number;
}

export interface Starship extends GalacticEntity {
  affiliation: 'República' | 'Imperio' | 'Sith' | 'Independiente';
  yearOfConstruction: number;
}

export interface Holocron extends GalacticEntity {
  powerLevel: number;
}

interface SearchByName<T> {
  searchByName(name: string): T[];
}

interface SearchByAffiliation<T> {
  searchByAffiliation(affiliation: string): T[];
}

interface SearchByPowerLevel<T> {
  searchByPowerLevel(powerLevel: number): T[];
}

interface SearchByYear<T> {
  searchByYear(year: number): T[];
}

interface SearchByOriginPlanet<T> {
  searchByOriginPlanet(planet: string): T[];
}

/**
 * A aprte de saber añadir entidades y removerlas, extiende la interfaz de nusqeuda, para saber busacr por nombre
 */
interface GalacticRegistry<T extends GalacticEntity> extends SearchByName<T>, SearchByOriginPlanet<T> {
  add(item: T): void;
  remove(name: string): void;
}

export abstract class BasicGalacticCollection<T extends GalacticEntity> implements GalacticRegistry<T> {
  protected entities: T[] = [];

  add(entity: T): void {
    this.entities.push(entity);
  }

  remove(name: string): void {
    this.entities = this.entities.filter(entity => entity.name !== name);
  }

  searchByName(name: string): T[] {
    return this.entities.filter(entity => entity.name === name);
  }

  searchByOriginPlanet(planet: string): T[] {
    return this.entities.filter(entity => entity.originPlanet === planet);
  }

  // abstract searchByAffiliation(affiliation: string): T[];
  // abstract searchByPowerLevel(powerLevel: number): T[];
  // abstract searchByYear(year: number): T[];
}



export class JediMasterCollection extends BasicGalacticCollection<JediMaster> implements SearchByAffiliation<JediMaster>, SearchByPowerLevel<JediMaster>, SearchByYear<JediMaster> {
  searchByAffiliation(affiliation: string): JediMaster[] {
    return this.entities.filter(jedi => jedi.affiliation === affiliation);
  }

  searchByPowerLevel(powerLevel: number): JediMaster[] {
    return this.entities.filter(jedi => jedi.powerLevel === powerLevel);
  }

  searchByYear(year: number): JediMaster[] {
    return this.entities.filter(jedi => jedi.yearOfFormation === year);
  }
}



export class StarshipCollection extends BasicGalacticCollection<Starship> implements SearchByAffiliation<Starship>, SearchByYear<Starship> {
  searchByAffiliation(affiliation: string): Starship[] {
    return this.entities.filter(starship => starship.affiliation === affiliation);
  }

  searchByYear(year: number): Starship[] {
    return this.entities.filter(starship => starship.yearOfConstruction === year);
  }
}



export class HolocronCollection extends BasicGalacticCollection<Holocron> implements SearchByPowerLevel<Holocron> {
  searchByPowerLevel(powerLevel: number): Holocron[] {
    return this.entities.filter(holocron => holocron.powerLevel === powerLevel);
  }
}   