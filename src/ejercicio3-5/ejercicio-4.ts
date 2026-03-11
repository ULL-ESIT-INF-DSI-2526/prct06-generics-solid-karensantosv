/**
 * ¿Por qué BasicPrinter está obligada a implementar cosas que no puede?
 * Porque la interfaz OfficeMachine tiene métodos que no utilizaría BasicPrinter.
 * 
 * Principios SOLID violados:
 * - Interface Segregation Principle: BasicPrinter se ve obligada a implementar métodos que no necesita.
 * 
 */

interface OfficeMachine {
  print(doc: string): void;
  scan(doc: string): string;
  fax(doc: string): void;
}

class BasicPrinter implements OfficeMachine {
  print(doc: string): void {
    console.log("Printing:", doc);
  }
  scan(_: string): string {
    throw new Error("Not supported");
  }
  fax(_: string): void {
    throw new Error("Not supported");
  }
}

function sendFax(m: OfficeMachine, doc: string) {
  m.fax(doc);
}

let bas: BasicPrinter = new BasicPrinter();

sendFax(bas, "Hello"); // Error en tiempo de ejecución, BasicPrinter no soporta fax

/**
 * Clase refactorizada para cumplir con los principios SOLID
 */

interface OfficeMachinePrintable {
  print(doc: string): void;
}

interface OfficeMachineScannable {
  scan(doc: string): string;
}

interface OfficeMachineFaxable {
  fax(doc: string): void;
}

class BasicPrinter2 implements OfficeMachinePrintable {
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

function sendFax2(m: OfficeMachineFaxable, doc: string) {
  m.fax(doc);
}