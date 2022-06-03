window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  createTable();

  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  function createTable(num = 100) {
    const numOfTableCells = document.getElementById("cells").value || num;
    if (!numOfTableCells || numOfTableCells > 300 || numOfTableCells < 1)
      return;

    const reset = resetTable();
    if (!reset) {
      return;
    }

    const tableContainer = document.querySelector(".table");
    if (tableContainer.firstChild) {
      while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
      }
    }

    for (let i = 0; i < numOfTableCells; i++) {
      const cell = document.createElement("div");
      cell.className = "table__cell";

      const tableCellNumber = document.createElement("div");
      tableCellNumber.className = "table__number";
      tableCellNumber.textContent = i + 1;
      cell.appendChild(tableCellNumber);

      const buyerName = document.createElement("div");
      buyerName.className = "table__buyer";
      buyerName.textContent = "Josephdfsfdsfdfsdfsdfdfs";
      cell.appendChild(buyerName);

      tableContainer.appendChild(cell);
    }
    console.log({ tableLength: tableContainer.children.length });
  }

  function resetTable() {
    const tableContainer = document.querySelector(".table");
    if (!tableContainer.children.length) {
      return true;
    }
    return window.confirm("Are you sure you want to reset the table?");
  }
});
