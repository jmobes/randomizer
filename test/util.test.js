import { Util } from '../classes/Util';
describe('util functions',() => {

    let util;

    beforeEach(() => {
        util = new Util();
    })

    it('should initialize a util class instance', () => {
        expect(util).toBeDefined();
    })

    it('returns hex color string with a length of 7', () => {
        expect(Util.hslToHex(360, 50, 50)).toHaveLength(7)
    })

    it('return -1 if first string comes 1st alphabetically', () => {
        const person1 = {name: 'amy'};
        const person2 = {name: 'bob'};
        expect(Util.compare(person1, person2)).toBe(-1);
    })

    it('return 1 if second string comes 1st alphabetically', () => {
        const person1 = {name: 'bob'};
        const person2 = {name: 'amy'};
        expect(Util.compare(person1, person2)).toBe(1);
    })

    it('return 0 if both strings are same', () => {
        const person1 = {name: 'bob'};
        const person2 = {name: 'bob'};
        expect(Util.compare(person1, person2)).toBe(0);
    })

    it('returns an object with properties that have a random hsl string and a values', () => {
        const desiredProperties = {
            hslString: 'hsl(360, 50%, 50%)',
            hslValues: {h: 360, s: 50, l: 50}
        }
        const randomColor = Util.getRandomColor();
        expect(randomColor).toBeDefined;
        expect(randomColor).toEqual(expect.objectContaining({
            hslString: expect.any(String),
            hslValues: expect.any(Object)
        }))
    })

    it('returns a random percentage between(inclusive) a given min and max value', () => {
        const randomPercentage = Util.getRandomPercentageRange(0, 100);
        expect(randomPercentage).toBeGreaterThanOrEqual(0);
        expect(randomPercentage).toBeLessThanOrEqual(100);
    })
})