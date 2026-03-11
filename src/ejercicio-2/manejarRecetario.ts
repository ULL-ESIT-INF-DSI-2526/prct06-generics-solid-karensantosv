import { Chef } from "./chef";
import { Recetas } from "./receta";
import { Paso } from "./paso";
import { Repository, SearchByName, SearchByTags, SearchByYearRange } from "./interfaz";

/**
 * Clase para manejar un recetario
 */
export class ManejarRecetario implements 
  Repository<Chef, string>, 
  SearchByName<Chef | Recetas | Paso>,
  SearchByTags<Paso>, 
  SearchByYearRange<Recetas> 
{
  /**
   * Constructor de la clase ManejarRecetario que inicializa el conjunto de chefs con el que se va a trabajar.
   * @param chefs - conjunto de chef
   */
  constructor(private chefs: Chef[]) {}

  add(item: Chef): void { this.chefs.push(item); }
  remove(id: string): void { this.chefs = this.chefs.filter(c => c.nombre !== id); }
  getById(id: string): Chef | undefined { return this.chefs.find(c => c.nombre === id); }
  getAll(): Chef[] { return this.chefs; }

  /**
   * 
   * @param n 
   * @returns 
   */
  searchByName(n: string): (Chef | Recetas | Paso)[] {
    const resultados: (Chef | Recetas | Paso)[] = [];
    
    // chef
    const chefsEncontrados = this.chefs.filter(c => c.nombre === n);
    resultados.push(...chefsEncontrados);

    // Recetas y Pasos
    this.chefs.forEach(chef => {
      chef.recetario.forEach(receta => {
        if (receta.nombre === n) resultados.push(receta);
        
        receta.pasos.forEach(paso => {
          if (paso.nombre === n) resultados.push(paso);
        });
      });
    });

    return resultados;
  }

  // por etiquetas
  searchByTags(tag: string): Paso[] {
    const encontrado: Paso[] = [];
    this.chefs.forEach(el => {
      el.recetario.forEach(el2 => {
        el2.pasos.forEach(el3 => {
          if (el3.etiquetas.includes(tag)) encontrado.push(el3);
        });
      });
    });
    return encontrado;
  }

  // por opcionalidad
  searchByOptionality(opcional: boolean): Paso[] {
    const encontrado: Paso[] = [];
    this.chefs.forEach(el => {
      el.recetario.forEach(el2 => {
        el2.pasos.forEach(el3 => {
          if (el3.esOpcional === opcional) encontrado.push(el3);
        });
      });
    });
    return encontrado;
  }

  // por rango
  searchByYearRange(start: number, end: number): Recetas[] {
    const encontrado: Recetas[] = [];
    this.chefs.forEach(el => {
      el.recetario.forEach(el2 => {
        if (el2.publicacion >= start && el2.publicacion <= end) encontrado.push(el2);
      });
    });
    return encontrado;
  }

  // seguidores
  searchByMinFollowers(min: number): Chef[] {
    return this.chefs.filter(c => c.seguidores >= min);
  }
}