// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', function() {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
document.addEventListener('click', function(e) {
  if (window.innerWidth < 751 && navMenu.classList.contains('open')) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// Smooth scroll for anchor links
const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
internalLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // For mobile close nav
      if (window.innerWidth < 751 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Scroll-triggered fade-in-up animations
function handleIO(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}
const fadeEls = document.querySelectorAll('.fade-in-up');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(handleIO, {
    threshold: 0.13
  });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('is-visible'));
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq__question');
  btn.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });
    if (!expanded) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
  // Keyboard navigation
  btn.addEventListener('keydown', function(e) {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });
});

// Contact form feedback (demo only, no backend)
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.querySelector('.contact__form-success').textContent = 'Danke! Wir melden uns zeitnah.';
    setTimeout(() => {
      contactForm.reset();
      contactForm.querySelector('.contact__form-success').textContent = '';
    }, 3700);
  });
}
