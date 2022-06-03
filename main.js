window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  function createTable() {
    const numOfTableCells = document.getElementById("cells").value;
    if (!numOfTableCells || numOfTableCells > 300) return;
  }
});
