export class Table {
    constructor() {
        super();
        this.size = 100;
        this.names = [...Array(DEFAULT_SIZE).keys()];
        this.tableElement = document.querySelector(".table");
    }

    registerEventListeners = () => {
    }

    createTable = (tableSize) => {
        const tableSize = tableSize || this.size;
        if (!tableSize || tableSize > 300 || tableSize < 1) {
            return;
        }
        this.updateNamesArray(tableSize)
    }

    updateNamesArray = (tableSize) => {
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
            deleteTable(tableContainer, reset);
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
}