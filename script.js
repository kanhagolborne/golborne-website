// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling - submit via AJAX to FormSubmit.co and show inline success
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (message && message.trim().length < 20) {
            alert('Please provide a bit more detail in your message (20+ characters).');
            return;
        }

        // Set Reply-To for Web3Forms and include page URL to reduce spam likelihood
        formData.set('replyto', email);
        formData.set('page_url', window.location.href);

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            // EmailJS configuration
            const serviceId = 'service_ijn86tq';
            const templateId = 'template_csedc9q';

            const templateParams = {
                from_name: name,
                reply_to: email,
                message: message,
                page_url: window.location.href
            };

            await emailjs.send(serviceId, templateId, templateParams);

            this.reset();
            showSuccessPopup();
        } catch (err) {
            console.error('EmailJS send failed:', err);
            alert('There was a problem sending your message. Please try again.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

// We no longer rely on URL redirects for success

// Function to show success popup
function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.style.display = 'flex';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            popup.classList.add('fade-out');
            setTimeout(() => {
                popup.style.display = 'none';
                popup.classList.remove('fade-out');
            }, 300); // Wait for fade-out animation to complete
        }, 3000);
    }
}

// Keep navbar consistently dark; remove scroll color switching

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.transition = 'opacity 0.5s ease';
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            }, { once: true });
        }
    });
});
