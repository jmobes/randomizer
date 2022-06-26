import { Table } from '../classes/Table.js';

class MockTable {
    
}

describe('table functions', () => {
    let table;
    beforeEach(() => {
        table = new Table();
    })

    it('initializes table instance', () => {
        expect(table).toBeDefined();
    })

    it('should assign a random position', () => {
        const positionArray = table.assignRandomPosition(10);
        expect(positionArray).toBeTruthy();
    })
});