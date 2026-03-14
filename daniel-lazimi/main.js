document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Fade-In Animation
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // Form Validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      const messageBox = form.querySelector('.form-message');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#C62828';
        } else {
          field.style.borderColor = 'var(--color-border)';
        }
      });

      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#C62828';
        }
      }

      const consentBox = form.querySelector('input[type="checkbox"][required]');
      if (consentBox && !consentBox.checked) {
        isValid = false;
      }

      if (isValid) {
        if (messageBox) {
          messageBox.textContent = 'Thank you. Your message has been sent securely. Daniel will be in touch within 24 hours.';
          messageBox.className = 'form-message success';
        }
        form.reset();
      } else {
        if (messageBox) {
          messageBox.textContent = 'Please fill out all required fields correctly and agree to the privacy notice.';
          messageBox.className = 'form-message error';
        }
      }
    });
  });
});
