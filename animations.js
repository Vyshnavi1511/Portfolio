/* ============================================
   VYSHNAVI VINOD PORTFOLIO — animations.js
   Sparkles · Typewriter · 3D Tilt · Canvas
   ============================================ */

/* ---- SPARKLE CANVAS ---- */
(function () {
  const canvas = document.getElementById('sparkleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#e8a0a0', '#d4a8c7', '#f5cfd0', '#c2d4c0', '#fce8ec', '#d4a847'];

  class Sparkle {
    constructor() { this.reset(true); }

    reset(random = false) {
      this.x   = Math.random() * canvas.width;
      this.y   = random ? Math.random() * canvas.height : canvas.height + 10;
      this.size = 1.2 + Math.random() * 2.5;
      this.speed = 0.2 + Math.random() * 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.opacity = 0;
      this.opacitySpeed = 0.008 + Math.random() * 0.015;
      this.phase = Math.random() > 0.5 ? 'in' : 'out';
      this.drift = (Math.random() - 0.5) * 0.3;
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.twinkleOffset += 0.04;
      this.opacity = 0.4 + 0.3 * Math.sin(this.twinkleOffset);
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const sparkles = Array.from({ length: 80 }, () => new Sparkle());

  // Mouse sparkle burst
  let lastBurst = 0;
  window.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastBurst < 60) return;
    lastBurst = now;
    for (let i = 0; i < 2; i++) {
      const s = new Sparkle();
      s.x = e.clientX + (Math.random() - 0.5) * 30;
      s.y = e.clientY + (Math.random() - 0.5) * 30;
      s.size = 1 + Math.random() * 2;
      s.speed = 0.5 + Math.random() * 1;
      s.opacity = 0.8;
      sparkles.push(s);
      if (sparkles.length > 140) sparkles.splice(0, 1);
    }
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---- TYPEWRITER EFFECT ---- */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Deep Learning models ✨',
    'Computer Vision systems 👁️',
    'intelligent assistants 🤖',
    'generative AI art 🎨',
    'the future of AI 🚀',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  function type() {
    if (paused) return;
    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; }, 1800);
      } else {
        setTimeout(type, 70 + Math.random() * 40);
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, 40);
      }
    }
  }

  setTimeout(type, 1800);
})();

/* ---- 3D TILT on PROJECT CARDS ---- */
(function () {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -8;
      const tiltY = dx *  8;
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;

      // Move shine
      const shine = card.querySelector('.project-card-shine');
      if (shine) {
        shine.style.background = `
          radial-gradient(circle at ${50 + dx * 40}% ${50 + dy * 40}%,
          rgba(255,255,255,0.12), transparent 60%)
        `;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s, background 0.45s, border-color 0.45s';
      const shine = card.querySelector('.project-card-shine');
      if (shine) shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent 50%)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.45s, background 0.45s, border-color 0.45s';
    });
  });
})();

/* ---- MAGNETIC BUTTONS ---- */
(function () {
  document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.22;
      const dy   = (e.clientY - cy) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'all 0.4s cubic-bezier(0.23,1,0.32,1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'background 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s';
    });
  });
})();

/* ---- PARALLAX HERO ORBS ---- */
(function () {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', e => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 12;
      orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
    });
  });
})();

/* ---- SCROLL PROGRESS BAR ---- */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2.5px; z-index: 999;
    background: linear-gradient(90deg, #e8a0a0, #d4a8c7, #e8a0a0);
    background-size: 200% auto;
    animation: shimmerText 2s linear infinite;
    width: 0%; transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

/* ---- SECTION TITLE WORD REVEAL ---- */
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('words-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
  });
})();

/* ---- SKILL TAG STAGGER ANIMATION ---- */
(function () {
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.tag');
        tags.forEach((tag, i) => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(10px)';
          setTimeout(() => {
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, 100 + i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => {
    cardObserver.observe(card);
  });
})();

/* ---- CLICK SPARKLE BURST ---- */
document.addEventListener('click', e => {
  const particles = 10;
  for (let i = 0; i < particles; i++) {
    const dot = document.createElement('div');
    const angle = (360 / particles) * i;
    const dist  = 30 + Math.random() * 30;
    const size  = 3 + Math.random() * 4;
    const colors = ['#e8a0a0','#d4a8c7','#f5cfd0','#d4a847'];
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px; top: ${e.clientY}px;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none; z-index: 9997;
      transform: translate(-50%,-50%);
      transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
      opacity: 1;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      const rad = (angle * Math.PI) / 180;
      dot.style.transform = `translate(${Math.cos(rad) * dist - size/2}px, ${Math.sin(rad) * dist - size/2}px) scale(0)`;
      dot.style.opacity = '0';
    });
    setTimeout(() => dot.remove(), 700);
  }
});
