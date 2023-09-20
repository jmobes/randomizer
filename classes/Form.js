// Form class
export class Form {
    constructor() {
        this.tableSizeElement = document.getElementById("cells");
        this.createTableButton = document.getElementById("createTable");
        this.nameInputElement = document.querySelector("#name");
        this.quantityInputElement = document.querySelector("#quantity");
        this.nameQuantitySubmit = document.getElementById("names__submit");
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