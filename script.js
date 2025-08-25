// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation class for smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Mobile navigation
class MobileNavigation {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu when clicking on a link
        if (this.navMenu) {
            this.navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.closeMenu();
                }
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.nav')) {
                this.closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navMenu.style.display = 'flex';
        this.navMenu.style.position = 'absolute';
        this.navMenu.style.top = '100%';
        this.navMenu.style.left = '0';
        this.navMenu.style.right = '0';
        this.navMenu.style.backgroundColor = 'var(--background-color)';
        this.navMenu.style.flexDirection = 'column';
        this.navMenu.style.padding = '1rem';
        this.navMenu.style.boxShadow = 'var(--shadow-medium)';
        this.navMenu.style.borderRadius = '0 0 var(--border-radius) var(--border-radius)';
        this.navMenu.style.border = '1px solid var(--border-color)';
        this.navMenu.style.borderTop = 'none';
        this.isOpen = true;

        // Update menu icon
        this.mobileMenuToggle.innerHTML = '<i data-feather="x"></i>';
        feather.replace();
    }

    closeMenu() {
        this.navMenu.style.display = '';
        this.navMenu.style.position = '';
        this.navMenu.style.top = '';
        this.navMenu.style.left = '';
        this.navMenu.style.right = '';
        this.navMenu.style.backgroundColor = '';
        this.navMenu.style.flexDirection = '';
        this.navMenu.style.padding = '';
        this.navMenu.style.boxShadow = '';
        this.navMenu.style.borderRadius = '';
        this.navMenu.style.border = '';
        this.isOpen = false;

        // Update menu icon
        this.mobileMenuToggle.innerHTML = '<i data-feather="menu"></i>';
        feather.replace();
    }
}

// Contact form handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (this.validateForm(data)) {
            this.showSuccessMessage();
            this.form.reset();
        } else {
            this.showErrorMessage();
        }
    }

    validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name || !email || !subject || !message) {
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        
        return true;
    }

    showSuccessMessage() {
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span class="button-text">Message Sent!</span><i data-feather="check" class="button-icon"></i>';
        submitButton.style.backgroundColor = '#4caf50';
        feather.replace();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            feather.replace();
        }, 3000);
    }

    showErrorMessage() {
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span class="button-text">Please fill all fields</span><i data-feather="alert-circle" class="button-icon"></i>';
        submitButton.style.backgroundColor = '#f44336';
        feather.replace();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            feather.replace();
        }, 3000);
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Animation on scroll
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, this.observerOptions);

            // Observe elements that should animate
            const animateElements = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .work-item, .timeline-item');
            animateElements.forEach(el => {
                this.observer.observe(el);
            });
        }
    }
}

// Page loading optimization
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        // Add loading state
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
        });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
        document.head.appendChild(fontLink);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
            }
        });
    }
}

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set body to loaded state immediately
    document.body.classList.add('loaded');
    
    // Initialize Feather icons with fallback
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, 100);

    // Initialize all components
    new ThemeManager();
    new MobileNavigation();
    new ContactForm();
    new SmoothScroll();
    new ScrollAnimations();
    new PageLoader();
    new PerformanceMonitor();
});

// Add CSS for animations
const animationStyles = `
    .skill-card,
    .project-card,
    .testimonial-card,
    .work-item,
    .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .skill-card.animate-in,
    .project-card.animate-in,
    .testimonial-card.animate-in,
    .work-item.animate-in,
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    body {
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    body.loaded {
        opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        .skill-card,
        .project-card,
        .testimonial-card,
        .work-item,
        .timeline-item {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Handle print styles
const printStyles = `
    @media print {
        .header,
        .footer,
        .cta-section {
            display: none;
        }
        
        body {
            font-size: 12pt;
            line-height: 1.4;
        }
        
        h1, h2, h3 {
            page-break-after: avoid;
        }
        
        .work-item,
        .timeline-item {
            page-break-inside: avoid;
        }
    }
`;

const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);
