// ── PROGRESS BAR ──
const prog = document.getElementById('prog');
if (prog) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
  }, { passive: true });
}

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── MOBILE MENU ──
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
if (hbg && mob) {
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
}
function closeMob() {
  if (hbg) hbg.classList.remove('open');
  if (mob) mob.classList.remove('open');
  document.body.style.overflow = '';
}

// ── INTERSECTION OBSERVER (fade-up + slide-in + scale-up) ──
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('v');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.a, .slide-l, .slide-r, .scale-up').forEach(el => io.observe(el));

// ── HERO PARALLAX ──
const heroBg = document.querySelector('.hero-bg');
const heroEl = document.querySelector('.hero');
const splitPhotos = document.querySelectorAll('.split-photo');
let rafPending = false;

function runParallax() {
  const sy = window.scrollY;

  // Split section photos: subtle inner parallax within their containers
  splitPhotos.forEach(photo => {
    const section = photo.closest('.split');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
    const offset = (rect.top + rect.height * 0.5 - window.innerHeight * 0.5) * 0.07;
    photo.style.transform = `translateY(${offset}px)`;
  });

  rafPending = false;
}

window.addEventListener('scroll', () => {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(runParallax);
  }
}, { passive: true });

// ── TIMELINE SCROLL TRIGGER ──
const aboutRight = document.querySelector('.about-split-right');
const yearsNumEl = document.querySelector('.tl-years-num');
const TARGET_YEARS = 38;

// Prep counter: hide number so JS can count it up
if (yearsNumEl) yearsNumEl.textContent = '0';

function animateCounter(el, to, duration) {
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
    el.textContent = Math.round(ease * to);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (aboutRight) {
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Start all SVG + chip + center-card CSS animations
        aboutRight.classList.add('tl-play');
        // Count up the years number (starts after the CSS reveal begins)
        if (yearsNumEl) setTimeout(() => animateCounter(yearsNumEl, TARGET_YEARS, 1400), 900);
        tlObs.disconnect();
      }
    });
  }, { threshold: 0.25 });
  tlObs.observe(aboutRight);
}

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CATEGORY FILTER BUTTONS ──
document.querySelectorAll('.cat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  });
});

// ── CONTACT FORM ──
const cform = document.getElementById('cform');
if (cform) {
  cform.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.fsub');
    btn.textContent = 'Thank you!';
    btn.style.background = '#2a5c24';
    setTimeout(() => {
      btn.innerHTML = 'Send Message <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  });
}
