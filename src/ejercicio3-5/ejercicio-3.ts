/**
 * ¿Qué ocurre si surge una nueva clase de figura geométrica?
 * Que si se quiere añadir una nueva figura, se tendría que modificar la clase AreaCalculator.
 * 
 * Principios SOLID violados:
 * - Open/Closed Principle: La clase AreaCalculator no está abierta para la extensión, ya que cada vez que se añade una nueva figura, se tiene que modificar la clase.
 * - Single Responsibility Principle: La clase AreaCalculator tiene la responsabilidad de calcular el área de diferentes figuras, lo que puede llevar a una clase con múltiples responsabilidades.
 * 
 */

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "tri"; base: number; height: number };

class AreaCalculator {
  area(s: Shape): number {
    switch (s.kind) {
      case "circle": return Math.PI * s.radius * s.radius;
      case "rect": return s.width * s.height;
      case "tri": return (s.base * s.height) / 2;
      default: throw new Error("Unknown shape");
    }
  }
}

/**
 * Clase refactorizada para cumplir con los principios SOLID
 */

interface Shape2 {
  area(): number;
}

class Circle implements Shape2 {
  constructor(public radius: number) {}
  
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle implements Shape2 {
  constructor(public width: number, public height: number) {}
  
  area(): number {
    return this.width * this.height;
  }
}

class Triangle implements Shape2 {
  constructor(public base: number, public height: number) {}
  
  area(): number {
    return (this.base * this.height) / 2;
  }
}

class AreaCalculator2 {
  area(s: Shape2): number {
    return s.area();
  }
}
