const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".button.is-rounded");
const range = document.querySelector("#range");
const mode = document.querySelector("#mode");
const save = document.querySelector("#save");
const rect = canvas.getBoundingClientRect();

let painting = false;
let filling = false;

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startPainting() {
  painting = true;
}

function endPainting() {
  painting = false;
}

function handleCanvasMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function handleCanvasMosueDown(e) {
  startPainting();
}

function handleCanvasMouseUp(e) {
  endPainting();
}

function handleCanvasMouseLeave(e) {
  endPainting();
}

function handleCanvasClick(e) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCanvasContextMenu(e) {
  e.preventDefault();
}

function handleColorClick(e) {
  const color = e.currentTarget.style.backgroundColor;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  ctx.lineWidth = e.currentTarget.value;
}

function handleModeClick(e) {
  if (filling) {
    filling = false;

    mode.innerText = "FILL";
  } else {
    filling = true;

    mode.innerText = "PAINT";
  }
}

function handleSaveClick(e) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");

  link.href = image;
  link.download = "paint";
  link.click();
}

// mobile
function handleCanvasTouchStart(e) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const x = e.touches[0].pageX - rect.left;
  const y = e.touches[0].pageY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, y);
}

function handleCanvasTouchMove(e) {
  e.preventDefault();

  const x = e.touches[0].pageX - rect.left;
  const y = e.touches[0].pageY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
}

function init() {
  canvas.addEventListener("mousemove", handleCanvasMouseMove);
  canvas.addEventListener("mousedown", handleCanvasMosueDown);
  canvas.addEventListener("mouseup", handleCanvasMouseUp);
  canvas.addEventListener("mouseleave", handleCanvasMouseLeave);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCanvasContextMenu);
  canvas.addEventListener("touchstart", handleCanvasTouchStart, false);
  canvas.addEventListener("touchmove", handleCanvasTouchMove, false);
  range.addEventListener("change", handleRangeChange);
  mode.addEventListener("click", handleModeClick);
  save.addEventListener("click", handleSaveClick);

  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

init();
