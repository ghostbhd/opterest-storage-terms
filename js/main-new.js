// Opterest Storage - Mobile-First Student Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Opterest Storage - Student Landing Page Loaded');
    
    // Initialize all features
    initializeCloseAnnouncement();
    initializeFAQAccordion();
    initializeFormValidation();
    initializeStickyElements();
    initializeScrollAnimations();
    initializeMobileOptimizations();
    initializeAccessibility();
});

/**
 * Close announcement bar functionality
 */
function initializeCloseAnnouncement() {
    const closeBtn = document.querySelector('.close-announcement');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (closeBtn && announcementBar) {
        closeBtn.addEventListener('click', function() {
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.opacity = '0';
            setTimeout(() => {
                announcementBar.style.display = 'none';
                // Adjust header position
                document.querySelector('.header').style.top = '0';
            }, 300);
            
            // Store preference
            localStorage.setItem('announcementClosed', 'true');
        });
        
        // Check if announcement was previously closed
        if (localStorage.getItem('announcementClosed') === 'true') {
            announcementBar.style.display = 'none';
            document.querySelector('.header').style.top = '0';
        }
    }
}

/**
 * FAQ Accordion functionality
 */
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.display = 'none';
                } else {
                    item.classList.add('active');
                    answer.style.display = 'block';
                }
                
                // Add haptic feedback on mobile
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        }
    });
}

/**
 * Form validation and submission
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#EF4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    submitBtn.style.opacity = '0.6';
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Thank you! We\'ll contact you soon.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Track conversion
        trackEvent('form_submit', 'conversion', 'cta_form');
        
    }, 2000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 5000);
}

/**
 * Sticky elements behavior
 */
function initializeStickyElements() {
    const stickyCTA = document.querySelector('.sticky-cta');
    const hero = document.querySelector('.hero');
    
    if (stickyCTA && hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.style.opacity = '0';
                    stickyCTA.style.pointerEvents = 'none';
                } else {
                    stickyCTA.style.opacity = '1';
                    stickyCTA.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(hero);
    }
    
    // WhatsApp button click tracking
    const whatsappBtn = document.querySelector('.whatsapp-button');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            trackEvent('click', 'contact', 'whatsapp');
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        });
    }
}

/**
 * Scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .timeline-item, .testimonial-card, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Mobile-specific optimizations
 */
function initializeMobileOptimizations() {
    // Touch gesture optimizations
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        // Swipe up to show CTA
        if (diff > swipeThreshold) {
            const stickyCTA = document.querySelector('.sticky-cta');
            if (stickyCTA) {
                stickyCTA.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stickyCTA.style.transform = 'scale(1)';
                }, 200);
            }
        }
    }
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Add mobile-specific event listeners
    if (window.innerWidth <= 768) {
        // Optimize button sizes for touch
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.minHeight = '48px';
            btn.style.minWidth = '48px';
        });
        
        // Add pull-to-refresh indicator
        let pullStart = 0;
        let pullCurrent = 0;
        
        document.addEventListener('touchstart', function(e) {
            if (window.pageYOffset === 0) {
                pullStart = e.touches[0].screenY;
            }
        });
        
        document.addEventListener('touchmove', function(e) {
            if (window.pageYOffset === 0) {
                pullCurrent = e.touches[0].screenY;
                if (pullCurrent - pullStart > 100) {
                    // Show refresh indicator
                    document.body.style.paddingTop = '20px';
                }
            }
        });
        
        document.addEventListener('touchend', function() {
            if (pullCurrent - pullStart > 100) {
                // Trigger refresh
                window.location.reload();
            }
            document.body.style.paddingTop = '0';
            pullStart = 0;
            pullCurrent = 0;
        });
    }
}

/**
 * Accessibility enhancements
 */
function initializeAccessibility() {
    // Add keyboard navigation for FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if not exists
    const hero = document.querySelector('.hero');
    if (hero && !document.getElementById('main-content')) {
        hero.id = 'main-content';
    }
    
    // Improve focus indicators
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

/**
 * Analytics and event tracking
 */
function trackEvent(action, category, label) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`Event tracked: ${action} - ${category} - ${label}`);
}

/**
 * Performance optimizations
 */
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .error {
        border-color: #EF4444 !important;
        background-color: rgba(239, 68, 68, 0.05) !important;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(style);

// Initialize performance optimizations
initializePerformanceOptimizations();
