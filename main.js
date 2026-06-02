// Progress bar
const prog = document.getElementById('prog');
if(prog) window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
});

// Nav scroll
const nav = document.getElementById('nav');
if(nav) window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
if(hbg && mob){
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
}
function closeMob() {
  if(hbg) hbg.classList.remove('open');
  if(mob){ mob.classList.remove('open'); }
  document.body.style.overflow = '';
}

// IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.a').forEach(el => io.observe(el));

// Parallax hero
const hgeo = document.getElementById('hgeo');
if(hgeo) window.addEventListener('scroll', () => {
  hgeo.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.18}px))`;
});

// Category buttons
document.querySelectorAll('.cat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  });
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Form submit
const cform = document.getElementById('cform');
if(cform) cform.addEventListener('submit', e => {
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
