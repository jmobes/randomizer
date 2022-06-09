export class Table {
    constructor() {
        super();
        this.size = 100;
        this.createTableButton = document.getElementById("createTable");
    }

    registerEventListeners = () => {
        this.createTableButton.addEventListener("click", createTable);
    }
}