const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

const STAR_COUNT = 120;
const stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i += 1) {
    stars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      r: random(1, 2.4),
      vx: random(-0.07, 0.07),
      vy: random(-0.06, 0.06),
      glow: random(0.45, 1),
    });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242,183,43,${star.glow})`;
    ctx.fill();
  }

  for (let i = 0; i < stars.length; i += 1) {
    for (let j = i + 1; j < stars.length; j += 1) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 90) {
        ctx.strokeStyle = `rgba(242,183,43,${0.12 - dist / 1000})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(update);
}

window.addEventListener('resize', () => {
  resize();
  createStars();
});

resize();
createStars();
update();
