import { describe, test, expect } from 'vitest';
import { Salty } from '../../src/ejercicioPE/salty'

describe( 'Ejercicio PE', () => {
    let s: Salty = new Salty("Pabellon", "Venezuela", 34, "principal");
    // let s_mal: Salty = new Salty("", "", -34, "principal");
    describe( 'Creacion del objeto: ', () => {
        test('crea el objero: ', () => {
            expect(s).toBeDefined();
        });

        test('comprobaciones: ', () => {
            expect(new Salty("", "Venezuela", 34, "principal")).toThrowError
            expect(new Salty("Arepa", "", 34, "principal")).toThrowError
            expect(new Salty("Arepa", "Venezuela", -34, "principal")).toThrowError
        });
    });

    describe( 'Getters: ', () => {
        test('getters: ', () => {
            expect(s.nombre).toBe("Pabellon");
            expect(s.pais).toBe("Venezuela");
            expect(s.tiempo).toBe(34);
            expect(s.tipo).toBe("principal");
        });
        
    });
    
    describe( 'Descripcion: ', () => {
        test('des: ', () => {
            expect(s.desc()).toMatch("Venezuela");
            expect(s.desc()).toContain("Plato: Pabellon, originaria del país: Venezuela, tarda: 34, y es de tipo: principal");
        });
    });
    
    describe( 'Time:  ', () => {
        test('time: ', () => {
            expect(s.time()).toBe(34);
        });
    });
});
