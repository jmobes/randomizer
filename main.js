import { Table } from './classes/Table.js';
class App {
  constructor() {
    window.addEventListener('load', () => {
      const table = new Table();
      table.createTable();
    });
  }
}

const app = new App();
