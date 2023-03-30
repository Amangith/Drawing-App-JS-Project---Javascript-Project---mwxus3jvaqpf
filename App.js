// JS CODE
const canvas = document.getElementById("drawing-board")
const toolbar = document.getElementById("toolbar")
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
const body = document.querySelector("body")
canvas.height = window.innerHeight - canvasOffsetY;
canvas.width = window.innerWidth - canvasOffsetX;

let isPainting = false;

var theColor = "";
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if(e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
})

toolbar.addEventListener('change', e => {
    if(e.target.class === 'clr') {
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id === 'inputId') {
            lineWidth = e.target.value;
        }
})

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favColor");

theInput.addEventListener("input", function() {
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
}, false);



let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
})
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
})

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY)
}
canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
     startX = e.clientX;
     startY = e.clientY;
})

canvas.addEventListener("mouseup", (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
})

canvas.addEventListener("mousemove", draw);

const foot = document.getElementById("footer")

fetch('https://api.adviceslip.com/advice').then(response => {
    return response.json();
}).then(adviceData => {
    const adviceObj = adviceData.slip;
    foot.innerHTML = adviceObj.advice;
}).catch(error => {
    console.log(error);
})
