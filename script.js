// زر البداية
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("celebration").style.display = "block";

  // رسالة المعايدة
  const message = `كل سنه و اختي القزعه الهبله طيبه😂 
طبعا العيوطه الي بتعيط علي اي حاجه زي الميزانيه الي باظت😂 
و الي بتقول علي نفسها كبرا بس هي طفله قال ايه تدهن فولترين😂 
كل سنه و طيبه و عيد سعيد عليك و تحققي كل الي نفسك في 
و صح عبال من نخلص منك و نجوزك😂 
الي اختي الكبيره مع خالص تحياتي 🙂`;

  document.getElementById("greeting-message").innerText = message;

  // تشغيل الموسيقى
  const music = document.getElementById("bg-music");
  music.play();

  // تشغيل الألعاب النارية
  startFireworks();
});

// 🎆 الألعاب النارية
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.color = color;
      this.speedX = random(-4, 4);
      this.speedY = random(-4, 4);
      this.alpha = 1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.01;
    }
  }

  function createFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height / 2);
    const colors = ["#ff0000", "#ff69b4", "#ffff00", "#00ff00", "#00ffff"];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      if (p.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        p.update();
        p.draw();
      }
    });
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 1000);
  animate();
}
