/* ========================================
   Swimming Zone - Vanilla JavaScript
   Interactive Features
   ======================================== */

// ========================================
// 1. Mobile Menu Toggle
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
});

// ========================================
// 2. Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========================================
// 3. Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and testimonials
document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// 4. Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
        
        // Show success message
        showAlert('Thank you for your message! We\'ll contact you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert function
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Set color based on type
    if (type === 'success') {
        alert.style.backgroundColor = '#10B981';
        alert.style.color = 'white';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#EF4444';
        alert.style.color = 'white';
    } else {
        alert.style.backgroundColor = '#3B82F6';
        alert.style.color = 'white';
    }
    
    // Add to document
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ========================================
// 5. Button Click Handlers
// ========================================

const startBtn = document.getElementById('startBtn');
if (startBtn) {
    startBtn.addEventListener('click', function() {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// 6. Navbar Scroll Effect
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// 7. Counter Animation (Optional)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ========================================
// 8. Lazy Loading Images (Optional)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// 9. Page Load Animation
// ========================================

window.addEventListener('load', function() {
    // Add animation class to body
    document.body.style.opacity = '1';
    
    // Trigger animations for hero section
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    if (heroImage) {
        heroImage.style.animation = 'slideInRight 0.8s ease-out';
    }
});

// ========================================
// 10. Utility Functions
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// ========================================
// 11. Service Card Interaction
// ========================================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// 12. Initialize on DOM Ready
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Swimming Zone website loaded successfully!');
    
    // Add any initialization code here
    // Example: Load data from API, initialize plugins, etc.
});

// ========================================
// 13. Print Friendly Styles
// ========================================

if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeQuery.addListener((e) => {
        if (e.matches) {
            // Dark mode is enabled
            document.documentElement.style.colorScheme = 'dark';
        } else {
            // Light mode is enabled
            document.documentElement.style.colorScheme = 'light';
        }
    });
}

// ========================================
// 14. Export Functions (for external use)
// ========================================

window.SwimmingZone = {
    showAlert: showAlert,
    animateCounter: animateCounter,
    debounce: debounce,
    getUrlParam: getUrlParam
};
