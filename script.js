// Mobile Menu Toggle
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const navLinks = document.querySelector(".nav-links");

      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      // Smooth Scrolling for Anchor Links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });

            // Close mobile menu if open
            navLinks.classList.remove("active");
          }
        });
      });

      // WhatsApp Form Submission
      const contactForm = document.getElementById("contactForm");

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const property = document.getElementById("property").value;
        const message = document.getElementById("message").value;

        // Format message for WhatsApp
        const whatsappMessage = `New Inquiry from Abims Prime Property Website:%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Property Interest:* ${property}%0A*Message:* ${message}`;

        // WhatsApp number
        const whatsappNumber = "2347062944139";

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, "_blank");

        // Reset the form
        contactForm.reset();
      });

      // Add scroll effect to header
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
          header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        } else {
          header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }
      });

      // Image Modal Functionality
      const modal = document.getElementById("imageModal");
      const modalImg = document.getElementById("modalImage");
      const closeModal = document.querySelector(".close-modal");

      // Add click event to all property cards
      document.querySelectorAll(".property-card").forEach((card) => {
        card.addEventListener("click", function () {
          const imageSrc = this.getAttribute("data-image");
          modal.style.display = "block";
          modalImg.src = imageSrc;
        });
      });

      // Close modal when clicking the X
      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
      });

      // Close modal when clicking outside the image
      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });

      // Close modal with Escape key
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          modal.style.display = "none";
        }
      });

