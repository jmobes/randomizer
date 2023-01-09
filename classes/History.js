import { Util } from "./Util.js";
export class History {
    constructor() {
        this.history = [];
        this.historyElement = document.querySelector(".history");
        // this.colorInputElements = [];
    }

    updateHistory = (color) => {
        this.removeAllChildNodes(this.historyElement);

        this.history = this.history.sort((a, b) => Util.compare(a, b));
        this.history.map(element => {
          const positions = element.positions;
          positions.sort((a,b) => a - b);
        })
        console.log({history: this.history})
        // this is causing a bug where the input element array is being doubled for every iteration
        this.history.map((element) => {
          const childContainer = document.createElement("div");
          childContainer.className = "history__item";
          const colorPicker = document.createElement("input");
          colorPicker.setAttribute("type", "color");
          colorPicker.setAttribute("value", Util.hslToHex(color.h, color.s, color.l));
          colorPicker.classList.add(`colorPicker`);
          colorPicker.classList.add(`${Math.floor(Math.random() * 100)}`);
          if(!element.colorPicker) {
            element.colorPicker = colorPicker;
            element.colorPicker.addEventListener('input', (e) => {
              const newColor = e.target.value;
              Util.changeNodeColor(newColor);
            })
          }
          // this.colorInputElements.push(colorPicker);
          const buyerName = document.createElement("div");
          buyerName.textContent = element.name;
          buyerName.className = "history__name";
          const buyerSpots = document.createElement("div");
          buyerSpots.textContent = `${element.positions
            .map((index) => index + 1)
            .join(", ")}`;
          buyerSpots.className = "history__spots";
          const nameColorContainer = document.createElement("div");
          nameColorContainer.classList.add("history__nameColor");
          nameColorContainer.appendChild(buyerName);
          nameColorContainer.appendChild(colorPicker);
          childContainer.appendChild(nameColorContainer);
          childContainer.appendChild(buyerSpots);
          this.historyElement.appendChild(childContainer);
        });
    }

    removeAllChildNodes = (parent) => {
        while (parent.firstElementChild) {
            parent.removeChild(parent.firstElementChild);
        }
    }

    resetHistory = () => {
      while(this.historyElement.firstChild) {
        this.historyElement.firstChild.remove();
      }
    }
}