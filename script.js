// ===== AOS INIT =====
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });



    // ===== HERO SLIDER =====
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const navButtons = document.querySelectorAll('.hero-slider-nav button');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function changeSlide(direction) {
        let newIndex = currentSlide + direction;
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showSlide(parseInt(btn.dataset.index));
        });
    });

    // Auto slide
    let slideInterval = setInterval(() => changeSlide(1), 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => changeSlide(1), 5000);
    });

    // ===== STICKY SEARCH =====
    const stickySearch = document.getElementById('stickySearch');
    const heroSection = document.querySelector('.hero-slider');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
            stickySearch.classList.add('visible');
        } else {
            stickySearch.classList.remove('visible');
        }
    });

    const closeSearchBtn = document.getElementById('closeSearchBtn');


closeSearchBtn.addEventListener('click', function(e) {
e.stopPropagation();
stickySearch.classList.add('hidden');
// Optionally save preference in localStorage
localStorage.setItem('searchBarClosed', 'true');
});



    // ===== IMAGE MODAL =====
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeImageModal = document.getElementById('closeImageModal');

    document.querySelectorAll('.property-card:not([data-video])').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn') || e.target.closest('.property-actions') || e.target.closest(
                    '.btn-book-clean')) return;
            const imgSrc = this.dataset.image;
            if (imgSrc) {
                imageModal.style.display = 'block';
                modalImage.src = imgSrc;
            }
        });
    });

    closeImageModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) imageModal.style.display = 'none';
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') imageModal.style.display = 'none';
    });

    // ===== VIDEO MODAL =====
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeVideoModal = document.getElementById('closeVideoModal');

    document.querySelectorAll('.property-card[data-video]').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn') || e.target.closest('.property-actions') || e.target.closest(
                    '.btn-book-clean')) return;
            const videoSrc = this.dataset.video;
            if (videoSrc) {
                videoModal.style.display = 'block';
                modalVideo.src = videoSrc;
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

    // ===== CLEANING BOOKING MODAL =====
    const cleaningModal = document.getElementById('cleaningModal');
    const closeCleaningModal = document.getElementById('closeCleaningModal');
    const cleaningServiceName = document.getElementById('cleaningServiceName');

    function openCleaningBooking(serviceName) {
        cleaningServiceName.value = serviceName || 'General Cleaning';
        cleaningModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeCleaningModal.addEventListener('click', () => {
        cleaningModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    window.addEventListener('click', (e) => {
        if (e.target === cleaningModal) {
            cleaningModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Cleaning booking form submission
    document.getElementById('cleaningBookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const service = document.getElementById('cleaningServiceName').value;
        const name = document.getElementById('cleanName').value;
        const phone = document.getElementById('cleanPhone').value;
        const email = document.getElementById('cleanEmail').value;
        const address = document.getElementById('cleanAddress').value;
        const date = document.getElementById('cleanDate').value;
        const notes = document.getElementById('cleanNotes').value;

        const msg =
            `New Cleaning Booking:%0A%0A*Service:* ${service}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Address:* ${address}%0A*Date:* ${date}%0A*Notes:* ${notes}`;
        window.open(`https://wa.me/2347062944139?text=${msg}`, '_blank');
        cleaningModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
    });

    // ===== CONTACT FORM =====
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const property = document.getElementById('property').value;
        const message = document.getElementById('message').value;

        const msg =
            `New Inquiry from Abims Prime Property Website:%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Property Interest:* ${property}%0A*Message:* ${message}`;
        window.open(`https://wa.me/2347062944139?text=${msg}`, '_blank');
        this.reset();
    });

    // ===== FAVORITE TOGGLE =====
    function toggleFavorite(btn) {
        btn.classList.toggle('saved');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('saved')) {
            icon.className = 'fas fa-heart';
            btn.style.background = 'var(--accent)';
            btn.style.color = 'white';
        } else {
            icon.className = 'far fa-heart';
            btn.style.background = 'rgba(255,255,255,0.9)';
            btn.style.color = 'var(--dark)';
        }
    }

    // ===== PROPERTY FILTER =====
    function filterProperties() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const type = document.getElementById('propertyType').value;
        const price = document.getElementById('priceRange').value;

        document.querySelectorAll('.property-card').forEach(card => {
            let show = true;
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.property-location')?.textContent.toLowerCase() || '';
            const cardType = card.dataset.type || '';
            const cardPrice = parseInt(card.dataset.price) || 0;

            if (searchTerm && !title.includes(searchTerm) && !location.includes(searchTerm)) show = false;
            if (type && cardType !== type) show = false;
            if (price) {
                const [min, max] = price.split('-').map(Number);
                if (price.endsWith('+')) {
                    if (cardPrice < parseInt(price)) show = false;
                } else if (max && (cardPrice < min || cardPrice > max)) {
                    show = false;
                }
            }
            card.style.display = show ? '' : 'none';
        });
    }

    // Search input live filter
    document.getElementById('searchInput').addEventListener('input', filterProperties);
    document.getElementById('propertyType').addEventListener('change', filterProperties);
    document.getElementById('priceRange').addEventListener('change', filterProperties);

    // ===== SCROLL EFFECT HEADER =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = 'var(--shadow)';
            header.style.background = 'rgba(255,255,255,0.95)';
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#') return;
            const element = document.querySelector(target);
            if (element) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({
                    top: element.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('🏠 Abims Prime Property - Premium Marketplace Platform Loaded!');
    console.log('✨ Features: Real Estate + Cleaning Services');
    console.log('📱 Fully Responsive | Modern UI | Micro-interactions');
