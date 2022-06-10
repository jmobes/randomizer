export class Form {
    constructor() {
        this.nameSubmission = document.getElementById("names__submit");
        this.tableSizeElement = document.getElementById("cells");
        this.nameInputElement = document.querySelector("#name");
        this.quantityInputElement = document.querySelector("#quantity");
        this.createTableButton = document.getElementById("createTable");

    }

    registerEventListeners = () => {
        this.nameSubmission.addEventListener("click", addNameToTable);
        this.createTableButton.addEventListener("click", createTable);

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