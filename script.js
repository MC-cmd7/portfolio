/* ── Hamburger Menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ── Active Nav Highlight on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

function setActive() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) {
      current = s.id;
    }
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

/* ── Scroll-Triggered Fade-Up Animation ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── Skill Bars Animate on Reveal ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target.querySelector('.skill-bar');
      if (bar) {
        bar.style.width = bar.dataset.pct + '%';
      }
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(el => skillObserver.observe(el));

/* ── Contact Form Submission ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');
    
    btn.disabled = true;
    btn.textContent = 'Sending…';
    
    setTimeout(() => {
      successMsg.style.display = 'block';
      e.target.reset();
      btn.textContent = '✓ Sent!';
      
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Send Message';
        successMsg.style.display = 'none';
      }, 5000);
    }, 900);
  });
}

/* ── Theme Toggle (Dark / Light Mode) ── */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDark = false;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

/* ── Typing Animation ── */
const typeTarget = document.getElementById('typeTarget');
const words = [
  "BTech CSE (AI & ML)", 
  "Problem Solver", 
  "Creative Thinker", 
  "JECRC University"
];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIdx];
  
  if (isDeleting) {
    charIdx--;
  } else {
    charIdx++;
  }
  
  typeTarget.textContent = currentWord.substring(0, charIdx);
  
  let delay = isDeleting ? 40 : 80;
  
  if (!isDeleting && charIdx === currentWord.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false; 
    wordIdx = (wordIdx + 1) % words.length; 
    delay = 400;
  }
  
  setTimeout(typeEffect, delay);
}

if (typeTarget) {
  typeEffect();
}

/* ── 3D Tilt Effect on Cards ── */
const tiltCards = document.querySelectorAll('.card, .skill-card, .project-card');

tiltCards.forEach(card => {
  card.classList.add('tilt-card');
  
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.4s ease';
  });
  
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});
