window.addEventListener("load", (event) => {
  // creates default table of size 100
  createTable();

  // grabs the create table button and registers click event listener
  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  // creates a table to be displayed on page
  function createTable(num = 100) {
    // gets size of table from either input or defaults to 100
    const numOfTableCells = document.getElementById("cells").value || num;
    if (!numOfTableCells || numOfTableCells > 300 || numOfTableCells < 1) {
      return;
    }

    // grabs table html element
    const tableContainer = document.querySelector(".table");

    // resets table if user confirms from prompt
    resetTable(tableContainer);

    createTableElements(numOfTableCells, tableContainer);
  }

  // prompts user to reset table and removes it
  function resetTable(tableContainer) {
    if (!tableContainer.children.length) {
      return;
    }
    // gets boolean value from user click
    let reset = window.confirm("Are you sure you want to reset the table?");

    deleteTable(tableContainer, reset);
  }

  // removes table
  function deleteTable(tableContainer, reset) {
    if (tableContainer.firstChild) {
      while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
      }
    }
    return;
  }

  // creates all cells inside table and adds to DOM
  function createTableElements(numOfTableCells, tableContainer) {
    for (let i = 0; i < numOfTableCells; i++) {
      const cell = document.createElement("div");
      cell.className = "table__cell";

      const tableCellNumber = document.createElement("div");
      tableCellNumber.className = "table__number";
      tableCellNumber.textContent = i + 1;
      cell.appendChild(tableCellNumber);

      const buyerName = document.createElement("div");
      buyerName.className = "table__buyer";
      cell.appendChild(buyerName);

      tableContainer.appendChild(cell);
    }
  }
});
