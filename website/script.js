/* ===== NAVBAR ===== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  hamburger?.classList.remove('active');
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

/* ===== SCROLL ANIMATIONS ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stat-item') || entry.target.closest('#statsSection')) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

const statsSection = document.getElementById('statsSection');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

/* ===== SIDEBAR ACTIVE STATE (Products Page) ===== */
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const categories   = document.querySelectorAll('.product-category');

if (sidebarLinks.length && categories.length) {
  const sidebar = document.querySelector('.products-sidebar');

  function setActiveLink(id) {
    sidebarLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
      if (isActive && sidebar) {
        // Scroll sidebar so active link is centered in view
        const linkTop = link.offsetTop;
        const sidebarH = sidebar.clientHeight;
        const linkH = link.clientHeight;
        sidebar.scrollTo({ top: linkTop - sidebarH / 2 + linkH / 2, behavior: 'smooth' });
      }
    });
  }

  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  categories.forEach(cat => catObserver.observe(cat));

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ===== SMOOTH HASH SCROLL ===== */
if (window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 300);
}

/* ===== BACK TO TOP ===== */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 350);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== LAZY IMAGE ERROR FALLBACK ===== */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0.3';
    img.alt = img.alt || 'Product Image';
  });
});
