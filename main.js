import { Table } from './classes/Table.js';
class App {
  constructor() {
    const table = new Table();
    table.createTable();
  }
}

const app = new App();
