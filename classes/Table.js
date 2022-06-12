import { Form } from './Form.js';
import { History } from './History.js';
import { Util } from './Util.js';

export class Table {
    constructor() {
        this.size = 100;
        this.names = [...Array(this.size).keys()];
        this.tableElement = document.querySelector(".table");
        this.spotsAvailableElement = document.querySelector(".openSpots");
        this.formObj = new Form();
        this.historyObj = new History();
        this.registerEventListeners();
    }

    registerEventListeners = () => {
        this.formObj.nameQuantitySubmit.addEventListener("click", () => this.addName(this.formObj.getName(), this.formObj.getQuantity()));
        this.formObj.createTableButton.addEventListener("click", () => this.createTable(this.formObj.getTableSize()));
    }

    createTable = (tableSize) => {
        tableSize = tableSize || this.size;
        if (!tableSize || tableSize > 300 || tableSize < 1) {
            return;
        }
        this.start(tableSize);
    }

    syncNamesWithTableSize = (tableSize) => {
        if (this.names.length > tableSize) {
            const startIndex = tableSize;
            const deleteCount = this.names.length - tableSize;
            this.names.splice(startIndex, deleteCount);
        }
        else if (this.names.length < tableSize) {
            const startIndex = this.names.length;
            const numOfItemsToAppend = tableSize - this.names.length;
            let appendedItems = [...Array(numOfItemsToAppend).keys()];
            appendedItems = appendedItems.map((v) => v + this.names.length);
            this.names.splice(startIndex, 0, ...appendedItems);
        }
        else {
            return;
        }
        return;
    }

    resetTable = () => {
        if (!this.tableElement.children.length) {
          return;
        }
        // gets boolean value from user click
        let reset = window.confirm("Are you sure you want to reset the table?");

        if(reset) {
            this.deleteTable();
        }
    } 

    deleteTable = () => {
        if (this.tableElement.firstChild) {
          while (this.tableElement.firstChild) {
            this.tableElement.removeChild(this.tableElement.firstChild);
          }
        }
        return;
    }

    createTableElements = (numOfTableCells) => {
        for (let i = 0; i < numOfTableCells; i++) {
          const cell = document.createElement("div");
          cell.className = "table__cell";

          const tableCellNumber = document.createElement("div");
          tableCellNumber.className = `table__number`;
          tableCellNumber.textContent = i + 1;
          cell.appendChild(tableCellNumber);

          const buyerName = document.createElement("div");
          buyerName.className = "table__buyer";
          cell.appendChild(buyerName);

          this.tableElement.appendChild(cell);
        }
    }

    updateAvailableSpots = (tableSize) => {
        this.spotsAvailableElement.textContent = tableSize;
    }

    start = (tableSize) => {
        this.syncNamesWithTableSize(tableSize);
        this.resetTable();
        this.createTableElements(tableSize);
        this.updateAvailableSpots(tableSize);
    }

    addName = (name, quantity) => {
        if (!name || isNaN(quantity) || quantity < 1) {
            return;
        }

        const tableCells = this.getAllTableCells();
        const spotsRemaining = this.names.length;

        // make sure user can't enter more spots that available in the table
        if (quantity > spotsRemaining) {
          return;
        }

        const positions = this.assignRandomPosition(quantity);
        const color = Util.getRandomColor();
        this.historyObj.history.push({ name, positions, color });
        this.historyObj.updateHistory(color.hslValues);
        let parent;
        let parentId;
        for (let i = 0; i < positions.length; i++) {
          tableCells[positions[i]].textContent = name;
          parent = tableCells[positions[i]].parentNode;
          parent.style.backgroundColor = color.hslString;
          parentId = name.replaceAll(" ", "") + Date.now();
          parent.classList.add(parentId);
        }
        if (parent && parentId) {
          Util.changeNodeColor(parentId);
        }
    }

    getAllTableCells = () => {
        const tableCells = document.querySelectorAll(".table__buyer");
        return tableCells;
    }

    assignRandomPosition = (quantity) => {
        let positionArr = [];
        for (let i = 0; i < quantity; i++) {
          if (!this.names.length) break;
          let position = Math.floor(Math.random() * this.names.length);
          positionArr.push(this.names[position]);
          this.names.splice(position, 1);
          this.updateAvailableSpots(this.names.length);
        }
        return positionArr;
    }
}