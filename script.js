// script.js

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    resetSlider();
  });
});

// Start auto-sliding
startSlider();

// ===== COUNTDOWN TIMER (7 days from now) =====
function initCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(23, 59, 59, 999);

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

initCountdown();

// ===== STATISTICS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'), 10);
    const increment = Math.ceil(target / 60);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        stat.textContent = target.toLocaleString();
        return;
      }
      stat.textContent = current.toLocaleString();
      requestAnimationFrame(updateCounter);
    };

    // Start counter when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(stat);
  });
}

animateStats();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      navMenu.classList.remove('active');
    }
  });
});

// ===== NEWSLETTER SUBSCRIPTION (demo) =====
const newsletterForm = document.querySelector('.newsletter-box form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (input.value.trim()) {
      alert(`✅ Thanks for subscribing! (${input.value})`);
      input.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// ===== BOOK CLEANING BUTTON (already uses inline alert) =====
// Additional enhancement: log clicks for analytics
document.querySelectorAll('.btn-cleaning').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // The inline onclick already handles the alert.
    // We just prevent duplicate alerts if needed – but keep as is.
    // If you want to remove inline onclick and use this, uncomment:
    // e.stopPropagation();
    // alert('Book cleaning for this property');
  });
});

// ===== CLOSE MOBILE MENU ON RESIZE =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
  }
});

console.log('PrimeEstate — premium real estate & cleaning marketplace loaded.');
