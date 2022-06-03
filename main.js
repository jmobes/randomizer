window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  function createTable() {
    const tableContainer = document.querySelector(".table");
    if (tableContainer.firstChild) {
      while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
      }
    }

    const numOfTableCells = document.getElementById("cells").value;
    if (!numOfTableCells || numOfTableCells > 300) return;

    for (let i = 0; i < numOfTableCells; i++) {
      const cell = document.createElement("div");
      cell.className = "table__cell";
      tableContainer.appendChild(cell);
    }
    console.log({ tableLength: tableContainer.children.length });
  }
});
