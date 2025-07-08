// Deacon Construction LLC - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Dropdown Menu for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 6000);
    }
    
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(el => animateObserver.observe(el));
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Project Filter (for portfolio page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
    
    // Video Controls
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video plays on mobile
        heroVideo.play().catch(e => {
            console.log('Auto-play prevented:', e);
        });
        
        // Pause video when not in viewport to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        videoObserver.observe(heroVideo);
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for your message. We will contact you within 24 hours.';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Initialize Google Map (if on contact page)
    if (typeof google !== 'undefined' && document.getElementById('map')) {
        initMap();
    }
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // Newsletter signup enhancement
    const newsletterForms = document.querySelectorAll('.signup-form');
    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && emailRegex.test(this.value)) {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                } else if (this.value) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else {
                    this.classList.remove('is-valid', 'is-invalid');
                }
            });
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate subscription (replace with actual API call)
                setTimeout(() => {
                    alert('Thank you for subscribing! Check your email for confirmation.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    emailInput.classList.remove('is-valid', 'is-invalid');
                }, 1500);
            }
        });
    });
    
    // Video testimonial placeholders
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        const playButton = placeholder.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                // Placeholder for video functionality
                alert('Video testimonial would play here. Integration with video hosting service needed.');
            });
        }
    });
    
    // Download button tracking
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadItem = this.closest('.download-item');
            const title = downloadItem.querySelector('h4').textContent;
            
            // Track download (replace with actual analytics)
            console.log(`Download initiated: ${title}`);
            
            // Simulate download
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Download Complete!';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
    
    // Smooth scrolling for anchor links (legal pages)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    }, 100));
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Performance optimization: Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Form input enhancements
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        // Add floating label effect
        if (input.placeholder) {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.addEventListener('focus', function() {
                    label.style.transform = 'translateY(-20px) scale(0.8)';
                    label.style.color = 'var(--secondary-color)';
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
                
                // Initial state check
                if (input.value) {
                    label.style.transform = 'translateY(-20px) scale(0.8)';
                }
            }
        }
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.hasAttribute('required') && this.value.trim()) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-valid', 'is-invalid');
            }
        });
    });
    
});

// Google Maps Initialization
function initMap() {
    const cashiers = { lat: 35.1115, lng: -83.0985 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: cashiers,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: cashiers,
        map: map,
        title: 'Deacon Construction LLC - Serving Cashiers, NC'
    });
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    .main-header.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .main-header.hidden {
        transform: translateY(-100%);
    }
    
    .main-header {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-item {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .project-item.show {
        opacity: 1;
        transform: scale(1);
    }
    
    .alert {
        padding: 15px;
        margin: 15px 0;
        border-radius: 4px;
    }
    
    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    form .error {
        border-color: #dc3545 !important;
    }
    
    .back-to-top:hover {
        background-color: var(--accent-color) !important;
        transform: translateY(-2px);
    }
    
    .faq-item.active .faq-answer {
        max-height: 500px !important;
    }
    
    .form-control.is-valid {
        border-color: #28a745;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%2328a745' d='m2.3 6.73.35-.35L4.18 4.2l1.53 2.18.35.35L6.4 6.4l-2.04-2.04L6.4 2.32l-.35-.35L4.52 3.5 2.98 1.32l-.35.35L4.17 3.8 2.13 5.84l-.35.35z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
    }
    
    .form-control.is-invalid {
        border-color: #dc3545;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath d='m5.8 4.6 1.4 1.4M6.2 7.4l1.4-1.4'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
    }
    
    .video-placeholder:hover .play-button {
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    .download-item:hover .download-type {
        background-color: var(--accent-color);
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 15px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 18px !important;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);