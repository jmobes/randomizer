export class Util {
    constructor() {

    }

     static hslToHex = (h, s, l) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, "0");
        };
        const hexString = `#${f(0)}${f(8)}${f(4)}`;
        return hexString;
    }

    static changeNodeColor = (id) => {
        const parentNodes = document.querySelectorAll(`.${id}`);
        const colorPickerInput = document.querySelector(".colorPicker");
        colorPickerInput.addEventListener("input", (e) => {
          const newColor = e.target.value;
          parentNodes.forEach((node) => {
            node.style.backgroundColor = newColor;
          });
        });
    }

    static compare = (a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
    }

    static getRandomColor = () => {
        const saturation = this.getRandomPercentageRange(0, 100);
        const lightness = this.getRandomPercentageRange(50, 100);
        const rgb = this.getRandomPercentageRange(0, 360);
        return {
          hslString: `hsl(${rgb},${saturation}%,${lightness}%)`,
          hslValues: { h: rgb, s: saturation, l: lightness },
        };
    }

    static getRandomPercentageRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}