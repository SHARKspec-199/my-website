const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

// كائن للألعاب النارية
class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: x,
        y: y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 6 + 2,
        radius: 2,
        alpha: 1
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
    });
  }

  draw() {
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${this.colors},${p.alpha})`;
      ctx.fill();
    });
  }
}

// تشغيل الأنيميشن
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((f, index) => {
    f.update();
    f.draw();
    if (f.particles[0].alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}
animate();

// زر البداية
startBtn.addEventListener("click", () => {
  // اخفاء الزرار
  startBtn.style.display = "none";

  // اظهار الرسالة
  message.classList.remove("hidden");

  // تشغيل الموسيقى
  music.play();

  // إطلاق الألعاب النارية كل 600ms
  setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = Math.random() * (canvas.height / 2);
    let colors = `${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}`;
    fireworks.push(new Firework(x, y, colors));
  }, 600);
});


