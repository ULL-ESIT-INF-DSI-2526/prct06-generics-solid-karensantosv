import { describe, expect, test, beforeEach } from 'vitest';
import { BasicGalacticCollection, JediMaster, Holocron, Starship, JediMasterCollection, HolocronCollection, StarshipCollection } from '../../src/ejercicio-1/ej1';

describe( 'Ejercicio 1 - Galactic Collections', () => {
   beforeEach(() => {
     jediCollection = new JediMasterCollection();
     starshipCollection = new StarshipCollection();
     holocronCollection = new HolocronCollection();
   });

   let jediCollection: JediMasterCollection;
   let starshipCollection: StarshipCollection;
   let holocronCollection: HolocronCollection;

   describe('JediMasterCollection', () => {
        test('debe añadir y remover un Jedi Master', () => {
            const jedi: JediMaster = {
                name: 'Luke',
                originPlanet: 'Tatooine',
                affiliation: 'Sith',
                powerLevel: 9000,
                yearOfFormation: 19
            };
            jediCollection.add(jedi);
            expect(jediCollection.searchByName('Luke')).toEqual([jedi]);
            jediCollection.remove('Luke');
            expect(jediCollection.searchByName('Luke')).toEqual([]);
        });

        test('debe buscar por afiliación', () => {
            const jedi1: JediMaster = {
                name: 'Obi-Wan Kenobi',
                originPlanet: 'Stewjon',
                affiliation: 'República',
                powerLevel: 8500,
                yearOfFormation: 57
            };
            const jedi2: JediMaster = {
                name: 'Darth Vader',
                originPlanet: 'Tatooine',
                affiliation: 'Sith',
                powerLevel: 9500,
                yearOfFormation: 19
            };
            jediCollection.add(jedi1);
            jediCollection.add(jedi2);
            expect(jediCollection.searchByAffiliation('República')).toEqual([jedi1]);
            expect(jediCollection.searchByAffiliation('Sith')).toEqual([jedi2]);
        });

        test('debe buscar por nivel de poder', () => {
            const jedi: JediMaster = {
                name: 'Yoda',
                originPlanet: 'Dagobah',
                affiliation: 'Sith',
                powerLevel: 10000,
                yearOfFormation: 896
            };
            jediCollection.add(jedi);
            expect(jediCollection.searchByPowerLevel(10000)).toEqual([jedi]);
        });

        test('debe buscar por año de formación', () => {
            const jedi: JediMaster = {
                name: 'Mace Windu',
                originPlanet: 'Haruun Kal',
                affiliation: 'Imperio',
                powerLevel: 9000,
                yearOfFormation: 72
            };
            jediCollection.add(jedi);
            expect(jediCollection.searchByYear(72)).toEqual([jedi]);
        });

        test('debe buscar por planeta de origen', () => {
            const jedi: JediMaster = {
                name: 'Anakin Skywalker',
                originPlanet: 'Tatooine',
                affiliation: 'Sith',
                powerLevel: 9000,
                yearOfFormation: 41
            };
            jediCollection.add(jedi);
            expect(jediCollection.searchByOriginPlanet('Tatooine')).toEqual([jedi]);
        });
    });

    describe('StarshipCollection', () => {
        test('debe añadir y remover una nave espacial', () => {
            const starship: Starship = {
                name: 'Millennium Falcon',
                originPlanet: 'Corellia',
                affiliation: 'Imperio',
                yearOfConstruction: 60
            };
            starshipCollection.add(starship);
            expect(starshipCollection.searchByName('Millennium Falcon')).toEqual([starship]);
            starshipCollection.remove('Millennium Falcon');
            expect(starshipCollection.searchByName('Millennium Falcon')).toEqual([]);
        });
        
        test('debe buscar por afiliación', () => {
            const starship1: Starship = {
                name: 'X-Wing',
                originPlanet: 'Corellia',
                affiliation: 'Independiente',
                yearOfConstruction: 55
            };
            const starship2: Starship = {
                name: 'TIE Fighter',
                originPlanet: 'Star Destroyer',
                affiliation: 'Independiente',
                yearOfConstruction: 50
            };
            starshipCollection.add(starship1);
            starshipCollection.add(starship2);
            expect(starshipCollection.searchByAffiliation('Independiente')).toEqual([starship1, starship2]);
        });

        test('debe buscar por año de construcción', () => {
            const starship: Starship = {
                name: 'Star Destroyer',
                originPlanet: 'Kuat',
                affiliation: 'Independiente',
                yearOfConstruction: 50
            };
            starshipCollection.add(starship);
            expect(starshipCollection.searchByYear(50)).toEqual([starship]);
        });

        test('debe buscar por planeta de origen', () => {
            const starship: Starship = {
                name: 'Slave I',
                originPlanet: 'Tatooine',
                affiliation: 'Sith',
                yearOfConstruction: 55
            };
            starshipCollection.add(starship);
            expect(starshipCollection.searchByOriginPlanet('Tatooine')).toEqual([starship]);
        });
    });

    describe('HolocronCollection', () => {
        test('debe añadir y remover un Holocron', () => {
            const holocron: Holocron = {
                name: 'Holocron of the Jedi Order',
                originPlanet: 'Coruscant',
                powerLevel: 5000
            };
            holocronCollection.add(holocron);
            expect(holocronCollection.searchByName('Holocron of the Jedi Order')).toEqual([holocron]);
            holocronCollection.remove('Holocron of the Jedi Order');
            expect(holocronCollection.searchByName('Holocron of the Jedi Order')).toEqual([]);
        });

        test('debe buscar por nivel de poder', () => {
            const holocron: Holocron = {
                name: 'Sith Holocron',
                originPlanet: 'Korriban',
                powerLevel: 7000
            };
            holocronCollection.add(holocron);
            expect(holocronCollection.searchByPowerLevel(7000)).toEqual([holocron]);
        });
        test('debe buscar por planeta de origen', () => {
            const holocron: Holocron = {
                name: 'Holocron of the Sith',
                originPlanet: 'Korriban',
                powerLevel: 7000
            };
            holocronCollection.add(holocron);
            expect(holocronCollection.searchByOriginPlanet('Korriban')).toEqual([holocron]);
        });
    });
});