/* ═══════════════════════════════════════════════════
   NIKHIL KUMAR PORTFOLIO — SCRIPT.JS
═══════════════════════════════════════════════════ */

/* ══════════════════════════════════════════
   1. LOADER
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after load
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 2000);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';


/* ══════════════════════════════════════════
   2. CUSTOM CURSOR
══════════════════════════════════════════ */
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth outline follow
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top  = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide on leave, show on enter
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity     = '0';
    cursorOutline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity     = '1';
    cursorOutline.style.opacity = '1';
  });
}


/* ══════════════════════════════════════════
   3. NAVBAR — scroll + active + mobile menu
══════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll → add .scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
  toggleBackToTop();
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  // Trap scroll when menu open
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close on outside click
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
      !navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}


/* ══════════════════════════════════════════
   4. TYPING ANIMATION
══════════════════════════════════════════ */
const typedEl = document.getElementById('typedText');
const phrases = [
  'responsive interfaces.',
  'clean, modern UIs.',
  'immersive web experiences.',
  'pixel-perfect layouts.',
  'interactive animations.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingPaused = false;

function type() {
  if (!typedEl) return;

  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Pause at end of phrase
      typingPaused = true;
      setTimeout(() => {
        typingPaused = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 45 : 85;
  setTimeout(type, speed);
}

// Start typing after loader
setTimeout(type, 2400);


/* ══════════════════════════════════════════
   5. SCROLL REVEAL
══════════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || 0);

    setTimeout(() => {
      el.classList.add('visible');
    }, delay);

    revealObserver.unobserve(el);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

// Skip hero elements (animated by loader callback)
revealElements.forEach(el => {
  if (!el.closest('#home')) {
    revealObserver.observe(el);
  }
});


/* ══════════════════════════════════════════
   6. SKILL BARS
══════════════════════════════════════════ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill  = entry.target;
    const width = fill.dataset.width || '0';
    // Small delay for stagger feel
    setTimeout(() => {
      fill.style.width = width + '%';
    }, 200);
    skillObserver.unobserve(fill);
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ══════════════════════════════════════════
   7. SMOOTH SCROLL for anchor links
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ══════════════════════════════════════════
   8. BACK TO TOP
══════════════════════════════════════════ */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════════
   9. CONTACT FORM VALIDATION
══════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

// Field config for validation
const fields = [
  {
    id:        'name',
    errorId:   'nameError',
    label:     'Name',
    minLength: 2,
    pattern:   null,
  },
  {
    id:      'email',
    errorId: 'emailError',
    label:   'Email',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  {
    id:        'subject',
    errorId:   'subjectError',
    label:     'Subject',
    minLength: 3,
    pattern:   null,
  },
  {
    id:        'message',
    errorId:   'messageError',
    label:     'Message',
    minLength: 10,
    pattern:   null,
  },
];

// Real-time validation on blur
fields.forEach(({ id, errorId, label, minLength, pattern }) => {
  const input = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!input || !error) return;

  input.addEventListener('blur', () => validateField(input, error, label, minLength, pattern));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      validateField(input, error, label, minLength, pattern);
    }
  });
});

function validateField(input, errorEl, label, minLength, pattern) {
  const value = input.value.trim();

  if (!value) {
    setError(input, errorEl, `${label} is required.`);
    return false;
  }
  if (minLength && value.length < minLength) {
    setError(input, errorEl, `${label} must be at least ${minLength} characters.`);
    return false;
  }
  if (pattern && !pattern.test(value)) {
    setError(input, errorEl, `Please enter a valid email address.`);
    return false;
  }

  clearError(input, errorEl);
  return true;
}

function setError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove('error');
  errorEl.textContent = '';
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Validate all fields
  let isValid = true;
  fields.forEach(({ id, errorId, label, minLength, pattern }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!validateField(input, error, label, minLength, pattern)) {
      isValid = false;
    }
  });

  if (!isValid) return;

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
    Sending...
  `;

  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Send Message
    `;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

// Spinner keyframe (injected so we don't need a CSS file edit)
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin-icon { animation: spin 0.9s linear infinite; width: 18px; height: 18px; }
`;
document.head.appendChild(spinStyle);


/* ══════════════════════════════════════════
   10. NAVBAR SCROLL HIDE / SHOW
══════════════════════════════════════════ */
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Don't hide nav when menu is open
  if (navLinks.classList.contains('open')) {
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// Ensure nav transition is set
navbar.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s, border-color 0.3s';


/* ══════════════════════════════════════════
   11. PROJECT CARD TILT on hover (desktop)
══════════════════════════════════════════ */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) *  5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ══════════════════════════════════════════
   12. ANIMATED STAT COUNTERS
══════════════════════════════════════════ */
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.textContent);
  if (isNaN(target)) return;
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let current  = 0;
  const step   = Math.ceil(target / 40);
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));


/* ══════════════════════════════════════════
   13. SKILL ITEM STAGGER on reveal
══════════════════════════════════════════ */
document.querySelectorAll('.skill-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 50}ms`;
});


/* ══════════════════════════════════════════
   14. REDUCE MOTION SUPPORT
══════════════════════════════════════════ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
  skillFills.forEach(fill => {
    fill.style.width = (fill.dataset.width || 0) + '%';
  });
}


/* ══════════════════════════════════════════
   15. FOOTER YEAR AUTO-UPDATE
══════════════════════════════════════════ */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.innerHTML = yearEl.innerHTML.replace(
    /\d{4}/,
    new Date().getFullYear()
  );
}