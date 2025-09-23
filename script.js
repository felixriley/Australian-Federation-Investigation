const canvas = document.getElementById("zoomCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scale = 1;
let offsetX = 0;
let offsetY = 0;

const images = [
  { src: "diary.png", x: -200, y: -200, w: 400, h: 300 },
  { src: "news.png", x: 600, y: -100, w: 400, h: 300 },
  { src: "poster.png", x: -800, y: 400, w: 400, h: 300 },
];
const loadedImages = {};
images.forEach(img => {
  const image = new Image();
  image.src = img.src;
  loadedImages[img.src] = image;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomIntensity = 0.1;
  const mouseX = e.clientX - canvas.width / 2 - offsetX;
  const mouseY = e.clientY - canvas.height / 2 - offsetY;
  const zoom = Math.exp(-e.deltaY * zoomIntensity / 100);
  scale *= zoom;
  offsetX -= mouseX * (zoom - 1);
  offsetY -= mouseY * (zoom - 1);
});

let isDragging = false;
let lastX, lastY;
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
canvas.addEventListener("mouseup", () => { isDragging = false; });
canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    offsetX += e.clientX - lastX;
    offsetY += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(scale, scale);
  images.forEach(img => {
    const image = loadedImages[img.src];
    if (image.complete) ctx.drawImage(image, img.x, img.y, img.w, img.h);
  });
  ctx.restore();
  requestAnimationFrame(draw);
}
draw();
