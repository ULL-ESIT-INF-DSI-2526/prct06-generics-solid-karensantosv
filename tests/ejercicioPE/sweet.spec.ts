import { describe, test, expect } from 'vitest';
import { Sweet, Propiedades } from '../../src/ejercicioPE/sweet'

describe( 'Ejercicio PE', () => {
    let sw: Sweet = new Sweet("Profiteroles", 3, 34, 20, 60);
    describe( 'Creacion del objeto: ', () => {
        test('crea el objero: ', () => {
            expect(sw).toBeDefined();
        });

        test('comprobaciones: ', () => {
            expect(new Sweet("", 3, 34, 20, 60)).toThrowError
            expect(new Sweet("Profiteroles", 3, -34, 20, 60)).toThrowError
            expect(new Sweet("Profiteroles", 3, 34, -20, 60)).toThrowError
            expect(new Sweet("Profiteroles", 3, 34, 20, -60)).toThrowError
        });
    });

    describe( 'Getters: ', () => {
        test('getters: ', () => {
            expect(sw.nombre).toBe("Profiteroles");
            expect(sw.dificultad).toBe(3);
            expect(sw.tiempohorneado).toBe(20);
            expect(sw.tiempopreparacion).toBe(34);
            expect(sw.tiemporefigeracion).toBe(60);
        });
        
    });
    
    describe( 'Descripcion: ', () => {
        test('des: ', () => {
            expect(sw.desc()).toStrictEqual(new Propiedades("Profiteroles", 3));
        });
    });
    
    describe( 'Time:  ', () => {
        test('time: ', () => {
            expect(sw.time()).toBe(34+20+60);
        });
    });
});
