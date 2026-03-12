import { describe, test, expect } from 'vitest';
import { CookBook } from '../../src/ejercicioPE/cookbook'
import { Salty } from '../../src/ejercicioPE/salty'
import { Sweet } from '../../src/ejercicioPE/sweet';

describe( 'Ejercicio PE', () => {
    let s: Salty = new Salty("Pabellon", "Venezuela", 34, "principal");
    let sw: Sweet = new Sweet("Profiteroles", 3, 34, 20, 60);
    let cb: CookBook<Sweet | Salty> = new CookBook([s, sw]);
    describe( 'Creacion del objeto: ', () => {
        test('crea el objero: ', () => {
            expect(cb).toBeDefined();
        });
    });

    describe( 'Getters: ', () => {
        test('getters: ', () => {
            expect(cb.recet).toStrictEqual([s, sw]);
        });
        
        test('setters: ', () => {
            expect(cb.recet = [sw, s]).toThrow;
        });
    });
    
    describe( 'Funcionalidades: ', () => {
        test('add: ', () => {
            let s2: Salty = new Salty("Arepa", "Venezuela", 20, "entrante");
            expect(cb.recet.length).toBe(2);
            cb.add(s2);
            expect(cb.recet.length).toBe(3);
        });

        test('remove: ', () => {
            let s2: Salty = new Salty("Arepa", "Venezuela", 20, "entrante");
            expect(cb.recet.length).toBe(3);
            cb.remove(s);
            expect(cb.recet.length).toBe(2);
        });

        test('get: ', () => {
            expect(cb.get(0)).toStrictEqual(sw);
        });

        test('get invalido: ', () => {
            expect(cb.get(9)).toBeUndefined();
        });

        test('size: ', () => {
            expect(cb.size()).toBe(2);
        });

        test('filter: ', () => {
            expect(cb.filter((el) => el === sw)).toStrictEqual([sw]);
        });

        test('avgTime: ', () => {
            expect(cb.avgTime()).toBe(67);
        });
    });
});
