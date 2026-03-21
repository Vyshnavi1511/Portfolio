/* ============================================
   VYSHNAVI VINOD PORTFOLIO — main.js
   Core interactions & utilities
   ============================================ */

/* ---- PAGE LOADER ---- */
(function () {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.id = 'pageLoader';
  loader.innerHTML = `
    <div class="loader-petals">🌸</div>
    <div class="loader-name">Vyshnavi Vinod</div>
    <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
  `;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      loader.style.opacity = '0';
      loader.style.transform = 'scale(1.04)';
      setTimeout(() => loader.remove(), 650);
    }, 1600);
  });
})();

/* ---- CUSTOM CURSOR ---- */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower
(function animateFollower() {
  followerX += (mouseX - followerX) * 0.14;
  followerY += (mouseY - followerY) * 0.14;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Hover effects
document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .stat-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    follower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    follower.classList.remove('hovered');
  });
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- HAMBURGER MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- FLOATING PETALS ---- */
const petalBg = document.getElementById('petalBg');
const petalColors = [
  'linear-gradient(135deg,#f5cfd0,#d4a8c7)',
  'linear-gradient(135deg,#e8a0a0,#fce8ec)',
  'linear-gradient(135deg,#c2d4c0,#d4a8c7)',
  'linear-gradient(135deg,#fce8ec,#f5cfd0)',
];

for (let i = 0; i < 28; i++) {
  const p = document.createElement('span');
  const w = 6 + Math.random() * 10;
  const h = w * 1.4;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${w}px; height: ${h}px;
    background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
    animation: floatPetal ${9 + Math.random() * 14}s linear ${Math.random() * 18}s infinite;
    border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
  `;
  petalBg.appendChild(p);
}

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- COUNTER ANIMATION ---- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1200;
  const step = (target / duration) * 16;
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* Profile image is loaded from 'Vyshnavi Image.jpeg' in the project folder */

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        const after = link.querySelector('::after');
      });
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--wine)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
