// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      navLinks.classList.remove('active');
    }
  });
});

// ===== HEADER SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.boxShadow = window.scrollY > 100
    ? '0 4px 10px rgba(0,0,0,0.1)'
    : '0 4px 6px rgba(0,0,0,0.1)';
});

// ===== WHATSAPP FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const property = document.getElementById('property').value;
  const message = document.getElementById('message').value;

  const whatsappMessage = `New Inquiry from Abims Prime Website:%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Interest:* ${property}%0A*Message:* ${message}`;
  const whatsappNumber = '2347062944139';
  window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  contactForm.reset();
});

// ===== IMAGE MODAL =====
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.property-card:not([data-video])').forEach(card => {
  card.addEventListener('click', function() {
    const src = this.getAttribute('data-image');
    if (src) {
      imageModal.style.display = 'block';
      modalImg.src = src;
    }
  });
});

closeModal.addEventListener('click', () => { imageModal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === imageModal) imageModal.style.display = 'none'; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') imageModal.style.display = 'none'; });

// ===== VIDEO MODAL =====
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeVideoModal = document.querySelector('.close-video-modal');

document.querySelectorAll('.property-card[data-video]').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) return;
    const src = this.getAttribute('data-video');
    if (src) {
      videoModal.style.display = 'block';
      modalVideo.src = src;
      modalVideo.play().catch(() => {});
    }
  });
});

closeVideoModal.addEventListener('click', () => {
  videoModal.style.display = 'none';
  modalVideo.pause();
  modalVideo.currentTime = 0;
});
window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.style.display === 'block') {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});
