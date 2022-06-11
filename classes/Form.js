export class Form {
    constructor() {
        this.tableSizeElement = document.getElementById("cells");
        this.createTableButton = document.getElementById("createTable");
        this.nameInputElement = document.querySelector("#name");
        this.quantityInputElement = document.querySelector("#quantity");
        this.nameQuantitySubmit = document.getElementById("names__submit");
    }

    registerEventListeners = () => {
        this.nameQuantitySubmit.addEventListener("click", this.table.addName(this.getName(), this.getQuantity()));
        this.createTableButton.addEventListener("click", this.table.createTable(this.getTableSize()));
    }

    getTableSize = () => {
        return this.tableSizeElement.value;
    }

    getName = () => {
        return this.nameInputElement.value;
    }

    getQuantity = () => {
        return this.quantityInputElement.value;
    }
}