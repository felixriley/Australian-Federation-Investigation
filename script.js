const canvas = document.getElementById("zoomCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scale = 1;          // zoom level
let offsetX = 0;        // pan offset X
let offsetY = 0;        // pan offset Y

// Handle resizing
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Handle scroll zoom
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomIntensity = 0.1;
  const mouseX = e.clientX - canvas.width / 2 - offsetX;
  const mouseY = e.clientY - canvas.height / 2 - offsetY;

  const zoom = Math.exp(-e.deltaY * zoomIntensity / 100);
  scale *= zoom;

  // Adjust offset so zoom happens at cursor position
  offsetX -= mouseX * (zoom - 1);
  offsetY -= mouseY * (zoom - 1);
});

// Draw loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(scale, scale);

  // Draw infinite grid pattern
  const size = 100; // cell size
  const halfRange = 2000; // how far we draw in each direction

  for (let x = -halfRange; x <= halfRange; x += size) {
    for (let y = -halfRange; y <= halfRange; y += size) {
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
      ctx.strokeRect(x, y, size, size);
    }
  }

  ctx.restore();
  requestAnimationFrame(draw);
}
draw();

