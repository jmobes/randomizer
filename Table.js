export class Table {
    constructor() {
        super();
        this.size = 100;
        this.names = [...Array(DEFAULT_SIZE).keys()];
        this.tableElement = document.querySelector(".table");
        this.spotsAvailableElement = document.querySelector(".openSpots");
    }

    registerEventListeners = () => {
    }

    createTable = (tableSize) => {
        const tableSize = tableSize || this.size;
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

        const positions = assignRandomPosition(quantity);
        const color = getRandomColor();
        historyArray.push({ name, positions, color });
        updateHistory(color.hslValues);
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
          changeNodeColor(parentId);
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
          namesArray.splice(position, 1);
          updateSpotsLeft(this.namess.length);
        }
        return positionArr;
    }

    getRandomColor = () => {
        const saturation = getRandomPercentageRange(0, 100);
        const lightness = getRandomPercentageRange(50, 100);
        const rgb = getRandomPercentageRange(0, 360);
        return {
          hslString: `hsl(${rgb},${saturation}%,${lightness}%)`,
          hslValues: { h: rgb, s: saturation, l: lightness },
        };
    }

    getRandomPercentageRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}