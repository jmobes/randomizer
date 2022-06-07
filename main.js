window.addEventListener("load", (event) => {
  // initializes array to default size of 100
  const DEFAULT_SIZE = 100;
  const namesArray = [...Array(DEFAULT_SIZE).keys()];

  // array to keep track of names and spots
  let historyArray = [];

  // creates default table of size 100
  createTable();

  // grabs the create table button and registers click event listener
  const tableCreateButton = document.getElementById("createTable");
  tableCreateButton.addEventListener("click", createTable);

  // grabs the enter name + quanity submit button and registers click event listener
  const nameSubmission = document.getElementById("names__submit");
  nameSubmission.addEventListener("click", addNameToTable);

  // creates a table to be displayed on page
  function createTable() {
    // gets size of table from either input or defaults to 100
    const DEFAULT_SIZE = 100;
    const numOfTableCells =
      Number(document.getElementById("cells").value) || DEFAULT_SIZE;
    if (!numOfTableCells || numOfTableCells > 300 || numOfTableCells < 1) {
      return;
    }

    updateNamesArray(namesArray, numOfTableCells);

    // grabs table html element
    const tableContainer = document.querySelector(".table");

    // resets table if user confirms from prompt
    resetTable(tableContainer);

    createTableElements(numOfTableCells, tableContainer);

    updateSpotsLeft(numOfTableCells);
    // return numOfTableCells || 100;
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
  }

  function addNameToTable() {
    const name = String(document.querySelector("#name").value).toUpperCase();
    const quantity = document.querySelector("#quantity").value || 1;
    if (!name || isNaN(quantity) || quantity < 1) {
      console.log("please enter a valid name or quantity");
      return;
    }

    const tableCells = document.querySelectorAll(".table__buyer");
    const spotsRemaining = namesArray.length;

    // make sure user can't enter more spots that available in the table
    if (quantity > spotsRemaining) {
      return;
    }
    const positions = assignRandomPosition(quantity, spotsRemaining);
    const color = getRandomColor();
    historyArray.push({ name, positions, color });
    updateHistory();
    for (let i = 0; i < positions.length; i++) {
      tableCells[positions[i]].textContent = name;
      const parent = tableCells[positions[i]].parentNode;
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
    const saturation = getRandomPercentageRange(0, 100);
    const lightness = getRandomPercentageRange(50, 100);
    const rgb = getRandomPercentageRange(0, 360);
    return `hsl(${rgb},${saturation}%,${lightness}%)`;
  }

  function getRandomPercentageRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // grabs element that displays available spots left and changes value depending on table spots left
  function updateSpotsLeft(size) {
    const openSpots = document.querySelector(".openSpots");
    openSpots.textContent = `${size} spots left`;
  }

  function updateNamesArray(namesArray, tableSize) {
    // removes items from names array if bigger than table size
    if (namesArray.length > tableSize) {
      const startIndex = tableSize;
      const deleteCount = namesArray.length - tableSize;
      namesArray.splice(startIndex, deleteCount);

      // adds items to names array if smaller than tablesize
    } else if (namesArray.length < tableSize) {
      const startIndex = namesArray.length;
      const numOfItemsToAppend = tableSize - namesArray.length;
      let appendedItems = [...Array(numOfItemsToAppend).keys()];
      appendedItems = appendedItems.map((v) => v + namesArray.length);
      namesArray.splice(startIndex, 0, ...appendedItems);
    } else {
      return;
    }
    return;
  }

  function updateHistory() {
    const asideElement = document.querySelector(".history");
    removeAllChildNodes(asideElement);
    historyArray = historyArray.sort((a, b) => compare(a, b));
    historyArray.map((element) => {
      const childContainer = document.createElement("div");
      childContainer.className = "history__item";
      const buyerName = document.createElement("div");
      buyerName.textContent = element.name;
      buyerName.className = "history__name";
      const buyerSpots = document.createElement("div");
      buyerSpots.textContent = `${element.positions
        .map((index) => index + 1)
        .join(", ")}`;
      buyerSpots.className = "history__spots";
      childContainer.appendChild(buyerName);
      childContainer.appendChild(buyerSpots);
      asideElement.appendChild(childContainer);
    });
  }

  function compare(a, b) {
    if (a.name < b.name) return -1;
    else if (a.name < b.name) return 1;
    else return 0;
  }

  function removeAllChildNodes(parent) {
    while (parent.firstElementChild) {
      parent.removeChild(parent.firstElementChild);
    }
  }
});
