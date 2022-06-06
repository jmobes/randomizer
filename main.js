window.addEventListener("load", (event) => {
  // creates default table of size 100
  const tableSize = createTable();

  // initializes array to null of set size (defaults to 100)
  const namesArray = [...Array(tableSize).keys()];

  // grabs the create table button and registers click event listener
  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  // grabs the enter name + quanity submit button and registers click event listener
  const nameSubmission = document.getElementById("names__submit");
  nameSubmission.addEventListener("click", addNameToTable);

  addNameToTable();

  // creates a table to be displayed on page
  function createTable(num = 100) {
    // gets size of table from either input or defaults to 100
    const numOfTableCells =
      Number(document.getElementById("cells").value) || num;
    if (!numOfTableCells || numOfTableCells > 300 || numOfTableCells < 1) {
      return;
    }

    // grabs table html element
    const tableContainer = document.querySelector(".table");

    // resets table if user confirms from prompt
    resetTable(tableContainer);

    createTableElements(numOfTableCells, tableContainer);

    return numOfTableCells || 100;
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
      tableCellNumber.className = `table__number`;
      tableCellNumber.textContent = i + 1;
      cell.appendChild(tableCellNumber);

      const buyerName = document.createElement("div");
      buyerName.className = "table__buyer";
      cell.appendChild(buyerName);

      tableContainer.appendChild(cell);
    }
    updateSpotsLeft(tableContainer.children.length);
  }

  function addNameToTable() {
    const name = String(document.querySelector("#name").value).toUpperCase();
    const quantity = document.querySelector("#quantity").value || 1;
    if (!name) return;

    const tableCells = document.querySelectorAll(".table__buyer");
    const spotsRemaining = namesArray.length;

    // make sure user can't enter more spots that available in the table
    if (quantity > spotsRemaining) {
      return;
    }
    const positions = assignRandomPosition(quantity, spotsRemaining);
    // const color = getRandomColor();
    const color = getRandomColor();
    for (let i = 0; i < positions.length; i++) {
      tableCells[positions[i]].textContent = name;
      const parent = tableCells[positions[i]].parentNode;
      // parent.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
      parent.style.backgroundColor = color;
    }
  }

  function assignRandomPosition(quantity, spotsRemaining) {
    let positionArr = [];
    for (let i = 0; i < quantity; i++) {
      if (!namesArray.length) break;
      let position = Math.floor(Math.random() * namesArray.length);
      positionArr.push(namesArray[position]);
      namesArray.splice(position, 1);
      updateSpotsLeft(namesArray.length);
    }
    return positionArr;
  }

  function getRandomColor() {
    // const red = Math.floor(Math.random() * 100);
    // const green = Math.floor(Math.random() * 100);
    // const blue = Math.floor(Math.random() * 100);
    // return { red, green, blue };
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`;
  }

  // grabs element that displays available spots left and changes value depending on table spots left
  function updateSpotsLeft(size) {
    const openSpots = document.querySelector(".openSpots");
    openSpots.textContent = `${size} spots left`;
  }
});
