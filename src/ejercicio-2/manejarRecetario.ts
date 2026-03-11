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
   * Metodo para buscar chefs, recetas o pasos por su nombre
   * @param n - nombre de chefs, recetas o pasos a buscar
   * @returns - array de chefs, recetas o pasos que coinciden con el nombre dado
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

  /**
   * Metodo para buscar pasos por sus etiquetas
   * @param tag - etiqueta de los pasos a buscar
   * @returns - array de pasos que coinciden con la etiqueta dada
   */
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

  /**
   * Metodo para buscar pasos por su opcionalidad
   * @param opcional - booleano que indica si se buscan pasos opcionales o no opcionales
   * @returns - array de pasos que coinciden con la opcionalidad dada
   */
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

  /**
   * Metodo para buscar recetas por su año de publicación
   * @param start -  año de inicio del rango de publicación de las recetas a buscar
   * @param end - año de fin del rango de publicación de las recetas a buscar
   * @returns - array de recetas que coinciden con el rango de años de publicación dado
   */
  searchByYearRange(start: number, end: number): Recetas[] {
    const encontrado: Recetas[] = [];
    this.chefs.forEach(el => {
      el.recetario.forEach(el2 => {
        if (el2.publicacion >= start && el2.publicacion <= end) encontrado.push(el2);
      });
    });
    return encontrado;
  }

  /**
   * Metodo para buscar chefs por su número de seguidores
   * @param min - número mínimo de seguidores de los chefs a buscar
   * @returns - array de chefs que coinciden con el número mínimo de seguidores dado
   */
  searchByMinFollowers(min: number): Chef[] {
    return this.chefs.filter(c => c.seguidores >= min);
  }
}