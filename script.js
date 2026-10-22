/* =============================================
   PORTFOLIO SCRIPT — Ayman Mazahir
   ============================================= */

// --- Year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile menu ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- Intersection Observer options ---
const obsOpts = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

// --- Timeline items ---
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, obsOpts);
document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

// --- Skill cards: bar animation ---
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(el => skillObserver.observe(el));

// --- Skill cards: entrance animation ---
const skillCards = document.querySelectorAll('.skill-card');
const skillEntranceObserver = new IntersectionObserver((entries) => {
  if (entries.some(e => e.isIntersecting)) {
    skillCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, box-shadow 0.3s ease`;
      }, i * 80);
    });
    skillEntranceObserver.disconnect();
  }
}, { threshold: 0.1 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillEntranceObserver.observe(skillsSection);

// --- Quality cards: entrance animation ---
const qualityCards = document.querySelectorAll('.quality-card');
const qualityObserver = new IntersectionObserver((entries) => {
  if (entries.some(e => e.isIntersecting)) {
    qualityCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
    qualityObserver.disconnect();
  }
}, { threshold: 0.1 });
const qualitiesSection = document.getElementById('qualities');
if (qualitiesSection) qualityObserver.observe(qualitiesSection);

// --- Smooth active nav link highlighting ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? 'var(--accent)' : '';
        link.style.fontWeight = isActive ? '700' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// --- Parallax blobs on mouse move ---
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.blob');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  blobs.forEach((blob, i) => {
    const f = (i + 1) * 0.35;
    blob.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
}, { passive: true });

// --- Avatar fallback ---
const avatarImg = document.getElementById('avatarImg');
if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    avatarImg.style.display = 'none';
    avatarImg.parentElement.innerHTML = `<div style="
      width:100%;height:100%;border-radius:50% 50% 48% 48%;
      background:linear-gradient(135deg,#e0f2fe,#e0e7ff,#d1fae5);
      display:flex;align-items:center;justify-content:center;
      font-size:5rem;">🧑‍💻</div>`;
  });
}

// --- Typing effect on hero badge ---
(function typeBadge() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  const text = badge.textContent;
  badge.textContent = '🛡️ ';
  let i = 2;
  const interval = setInterval(() => {
    if (i >= text.length) { clearInterval(interval); return; }
    badge.textContent += text[i++];
  }, 40);
})();
