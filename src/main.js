// ==========================================
// 1982 MEZUNU HAVACILАР DERNEĞİ - MAIN JS
// ==========================================


// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHero();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initScrollToTop();
  initActiveNavLinks();
  initParallax();
});

// ==========================================
// NAVBAR - Scroll behavior
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

const navbar = document.getElementById('navbar');

// ==========================================
// HERO
// ==========================================
function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Trigger zoom-out animation
  setTimeout(() => {
    hero.classList.add('loaded');
  }, 100);

  // Try to load the hero image (user should place it as src/assets/hero-painting.jpg)
  const heroImg = document.getElementById('heroBgImg');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      // Fallback: Create a beautiful CSS gradient background
      heroImg.style.display = 'none';
      const wrapper = heroImg.closest('.hero-image-wrapper');
      if (wrapper) {
        wrapper.style.background = `
          linear-gradient(
            135deg,
            #0d1b2a 0%,
            #1a2f4a 25%,
            #2d3a1e 50%,
            #1a2f4a 75%,
            #0d1b2a 100%
          )
        `;
        // Add some aviation-themed CSS pattern
        wrapper.style.backgroundSize = '400% 400%';
        wrapper.style.animation = 'gradientShift 12s ease infinite';

        const style = document.createElement('style');
        style.textContent = `
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `;
        document.head.appendChild(style);
      }
    });
  }
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
function initScrollAnimations() {
  // Add reveal class to animatable elements
  const animatables = document.querySelectorAll(`
    .about-info-card,
    .membership-card,
    .purpose-card,
    .founder-card,
    .board-panel,
    .activity-card,
    .timeline-content,
    .martyrs-panel,
    .anma-card,
    .dp-item,
    .tuzuk-banner,
    .contact-info-panel,
    .contact-form-panel
  `);

  animatables.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  animatables.forEach(el => observer.observe(el));
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const nav = document.getElementById('navbar');
        const offset = (nav ? nav.offsetHeight : 80) + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
function initScrollToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// ACTIVE NAV LINKS (scroll spy)
// ==========================================
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -60% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ==========================================
// PARALLAX (Hero image)
// ==========================================
function initParallax() {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

// ==========================================
// COPY IBAN
// ==========================================
window.copyIban = function () {
  const iban = 'TR97 0006 4000 0013 4560 4835 26';
  const btn = document.getElementById('copyIbanBtn');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(iban).then(() => {
      showCopySuccess(btn);
    }).catch(() => {
      fallbackCopy(iban, btn);
    });
  } else {
    fallbackCopy(iban, btn);
  }
};

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showCopySuccess(btn);
  } catch (err) {
    showToast('Kopyalama başarısız. Lütfen manuel kopyalayın.', 'error');
  }
  document.body.removeChild(ta);
}

function showCopySuccess(btn) {
  if (!btn) return;
  btn.classList.add('copied');
  btn.innerHTML = '<i class="fas fa-check"></i>';
  showToast('IBAN panoya kopyalandı! ✓', 'success');

  setTimeout(() => {
    btn.classList.remove('copied');
    btn.innerHTML = '<i class="fas fa-copy"></i>';
  }, 3000);
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.style.borderLeftColor = type === 'success' ? '#2d7a4a'
    : type === 'error' ? '#8b1a1a' : 'var(--gold)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ==========================================
// CONTACT FORM
// ==========================================
window.handleFormSubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitFormBtn');
  const success = document.getElementById('formSuccess');

  // Basic validation
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--red-honor)';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('Lütfen zorunlu alanları doldurunuz.', 'error');
    return;
  }

  // Simulate form submission
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

  setTimeout(() => {
    btn.style.display = 'none';
    if (success) {
      success.classList.add('visible');
    }
    showToast('Mesajınız başarıyla iletildi!', 'success');
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Gönder';
      btn.style.display = '';
      if (success) {
        success.classList.remove('visible');
      }
    }, 5000);
  }, 1500);
};

// ==========================================
// EXPOSE global functions (for inline HTML calls)
// ==========================================
window.showToast = showToast;
