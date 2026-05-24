const container = document.getElementById("container");
const color = document.getElementById('color');
const reset = document.getElementById("reset");
const sizeBtn = document.getElementById("size");
const rgbBtn = document.getElementById("rgb");
const eraserBtn = document.getElementById("eraser");

let colorpick = color.value;
let rgbMode = false;
let eraserMode = false;

//rgb generator
function getRandomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g}, ${b})`;
}

//opacity
function colorSquare(square) {

    let darkLevel = parseInt(square.dataset.darkness) || 0;
    if (eraserMode) {
        square.style.backgroundColor = "";
        square.style.filter = "";
        square.dataset.darkness = 0;
        return;
    }

    if (darkLevel < 10) {
        darkLevel++;
    }

    square.dataset.darkness = darkLevel;

    if (rgbMode) {
        square.style.backgroundColor = getRandomRGB();
    } else {
        square.style.backgroundColor = colorpick;
    }

    square.style.filter = `brightness(${100 - darkLevel * 10}%)`;
}

function createGrid(size) {

    container.innerHTML= "";

    for (let i = 0; i < size; i++) {
        const col = document.createElement('div');
        col.className = 'col';

        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');

            square.className = 'grid_box';
            square.style.border = '1px solid black';

            square.dataset.darkness = 0;

            square.addEventListener("mouseover", (e) => {
                if (e.buttons === 1) {
                    colorSquare(square);
                }
            });
            square.addEventListener("mousedown", () => {
                colorSquare(square);
            });
            
            col.appendChild(square);
        }
        container.appendChild(col);
    }
}

createGrid(16);

color.addEventListener('input', function(e) {
    colorpick = e.target.value;
    rgbMode = false;
    eraserMode = false;

    eraserBtn.textContent = "Eraser";
});

rgbBtn.addEventListener('click', () => {
    rgbMode = !rgbMode;

    if(rgbMode) {
        eraserMode = false;
        eraserBtn.textContent = "Eraser"
    }

    rgbBtn.textContent = rgbMode
    ? "Rainbow ON"
    : "Rainbow Mode"
});

eraserBtn.addEventListener("click", () => {
    eraserMode = !eraserMode;

    if (eraserMode) {
        rgbMode = false;
        eraserBtn.textContent = "Eraser ON"
    } else {
        eraserBtn.textContent = "Eraser"
    }
});

reset.addEventListener('click', () => {
    document.querySelectorAll(".grid_box").forEach(square => {
        square.style.backgroundColor = "";
        square.style.opacity = 1;
        square.dataset.darkness = 0;
    });
});

sizeBtn.addEventListener("click", () => {
    let size = parseInt(prompt("Enter grid size: (1-100)"));

    if (
        isNaN(size) ||
        size < 1 ||
        size > 100
    ) {
        alert ("Enter numebr from 1-100");
        return
    }
    createGrid(size);
});