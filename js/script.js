// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });

  // Scroll animations (fade-in)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Build WhatsApp message
      let whatsappMsg = `Salut Adina! Mă numesc ${name}.`;
      if (service) {
        const serviceLabels = {
          'ipotecar': 'credit ipotecar',
          'refinantare': 'refinanțare',
          'nevoi-personale': 'credit de nevoi personale',
          'constructii': 'credit de construcții',
          'teren': 'credit achiziție teren',
          'altele': 'altceva'
        };
        whatsappMsg += ` Sunt interesat/ă de ${serviceLabels[service] || service}.`;
      }
      if (message) {
        whatsappMsg += ` ${message}`;
      }
      whatsappMsg += ` Numărul meu: ${phone}`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/40754243673?text=${encodeURIComponent(whatsappMsg)}`;
      window.open(whatsappUrl, '_blank');

      // Show success message
      contactForm.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 3rem; margin-bottom: 16px;">✅</div>
          <h3 style="margin-bottom: 12px;">Mulțumesc!</h3>
          <p>Cererea ta a fost trimisă prin WhatsApp. Te voi contacta în cel mai scurt timp posibil.</p>
          <p style="margin-top: 16px;"><a href="tel:+40754243673" class="btn btn-primary">Sau sună-mă direct</a></p>
        </div>
      `;
    });
  }
});
