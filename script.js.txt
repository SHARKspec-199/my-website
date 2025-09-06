const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.alpha <= 0) fireworks.splice(i, 1);
  });
}

startBtn.addEventListener("click", () => {
  message.classList.remove("hidden");
  music.play();

  setInterval(() => {
    for (let i = 0; i < 20; i++) {
      fireworks.push(new Firework(canvas.width / 2, canvas.height / 2));
    }
  }, 500);

  animate();
});
