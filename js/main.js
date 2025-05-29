// Opterest Storage - Modern Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Opterest Storage - Modern Landing Page Loaded');
    
    // Initialize core features
    initializeCloseAnnouncement();
    initializeButtonInteractions();
    initializeResponsiveFeatures();
    initializeAnimations();
    initializeAccessibilityFeatures();
    initializeFAQAccordion();
    initializeScrollAnimations();
    initializeFloatingCTA();
    initializeTestimonialCarousel();
    initializeBackToTop();
    initializeLazyLoading();
});

/**
 * Enhanced button interactions and analytics
 */
function initializeButtonInteractions() {
    // Enhanced WhatsApp button interaction
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            console.log('WhatsApp button clicked');
            
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Track event
            trackEvent('click', 'contact', 'whatsapp');
            
            // Add vibration feedback on mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    }
    
    // Enhanced Terms & Pricing button interaction
    const termsBtn = document.querySelector('.btn-primary');
    if (termsBtn) {
        termsBtn.addEventListener('click', function(e) {
            console.log('Terms & Pricing button clicked');
            createRippleEffect(e, this);
            trackEvent('click', 'navigation', 'terms_pricing');
        });
    }
    
    // Enhanced Reserve button interaction (both hero and secondary)
    const reserveBtns = document.querySelectorAll('.btn-reserve');
    reserveBtns.forEach((reserveBtn, index) => {
        reserveBtn.addEventListener('click', function(e) {
            console.log(`Reserve Your Spot button clicked (${index === 0 ? 'hero' : 'secondary'})`);
            createRippleEffect(e, this);
            trackEvent('click', 'conversion', `reserve_spot_${index === 0 ? 'hero' : 'secondary'}`);
            
            // Add success feedback
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = this.classList.contains('btn-hero') ? 'heroPulse 2s ease-in-out infinite' : 'pulse 2s ease-in-out infinite';
            }, 100);
            
            // Add vibration feedback on mobile
            if (navigator.vibrate) {
                navigator.vibrate([50, 100, 50]);
            }
        });
        
        // Add extra attention on scroll into view for hero button
        if (index === 0 && reserveBtn.classList.contains('btn-hero')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDuration = '1.5s';
                    } else {
                        entry.target.style.animationDuration = '2s';
                    }
                });
            });
            observer.observe(reserveBtn);
        }
    });
    
    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Touch interaction for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
        
        // Click interaction
        card.addEventListener('click', function() {
            trackEvent('click', 'feature_card', `feature_${index + 1}`);
        });
    });
    
    // Enhanced email button with copy to clipboard
    const emailBtns = document.querySelectorAll('.email-btn');
    emailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            // Create ripple effect
            createRippleEffect(e, this);
            
            // Copy email to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email address copied to clipboard!');
                }).catch(() => {
                    showToast('Click to open email client');
                    window.location.href = this.href;
                });
            } else {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast('Email address copied to clipboard!');
            }
            
            // Track event
            trackEvent('click', 'contact', 'email');
        });
    });
    
    // Enhanced phone button interactions
    const phoneBtns = document.querySelectorAll('.phone-btn');
    phoneBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            trackEvent('click', 'contact', 'phone');
        });
    });
}

/**
 * Enhanced responsive features for all screen sizes
 */
function initializeResponsiveFeatures() {
    // Handle viewport changes
    const handleViewportChange = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Adjust for mobile browsers with dynamic viewport
        if (window.innerWidth <= 768) {
            document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
        }
    };
    
    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 100);
    });
    
    // Detect mobile device for touch optimizations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouch) {
        document.body.classList.add('is-mobile');
        optimizeForTouch();
    }
    
    // Handle reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
}

/**
 * Optimize interface for touch devices
 */
function optimizeForTouch() {
    // Add larger touch targets
    const buttons = document.querySelectorAll('.btn, .feature-card, .contact-item');
    buttons.forEach(button => {
        button.style.minHeight = '48px';
        button.style.touchAction = 'manipulation';
    });
    
    // Add haptic feedback for touch interactions
    const interactiveElements = document.querySelectorAll('.btn, .feature-card');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent double-tap zoom on buttons
    const preventZoom = document.querySelectorAll('.btn');
    preventZoom.forEach(btn => {
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

/**
 * Accessibility enhancements
 */
function initializeAccessibilityFeatures() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
        
        // Handle Escape key for modals or overlays
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add keyboard navigation support for interactive elements
    const focusableElements = document.querySelectorAll('.btn, .feature-card, .contact-item');
    
    focusableElements.forEach((element, index) => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % focusableElements.length;
                focusableElements[nextIndex].focus();
            }
            
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
                focusableElements[prevIndex].focus();
            }
        });
    });
    
    // Add screen reader support for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        const title = card.querySelector('.feature-title');
        if (title) {
            card.setAttribute('aria-label', `Feature ${index + 1}: ${title.textContent}`);
        }
    });
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Add staggered animation to trusted logos
    const trustedLogos = document.querySelectorAll('.trusted-logo');
    trustedLogos.forEach((logo, index) => {
        logo.style.animationDelay = (0.1 * index) + 's';
    });
    
    // Enhance button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px)';
        });
    });
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * Enhanced analytics tracking
 */
function trackEvent(action, category, label, value) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    
    // Console logging for development
    console.log(`Event tracked: ${action} | ${category} | ${label}${value ? ` | ${value}` : ''}`);
}

/**
 * Form validation helper
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

/**
 * Close modal helper
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

/**
 * Handle announcement bar close button
 */
function initializeCloseAnnouncement() {
    const closeButton = document.querySelector('.close-announcement');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (closeButton && announcementBar) {
        closeButton.addEventListener('click', function() {
            announcementBar.style.height = announcementBar.offsetHeight + 'px';
            
            // Trigger reflow
            announcementBar.offsetHeight;
            
            // Add class for animation
            announcementBar.classList.add('closing');
            
            // Remove after animation completes
            setTimeout(() => {
                announcementBar.style.display = 'none';
            }, 300);
            
            // Store in session storage so it doesn't show again during this session
            sessionStorage.setItem('announcementClosed', 'true');
        });
    }
    
    // Check if announcement was previously closed
    if (sessionStorage.getItem('announcementClosed') === 'true' && announcementBar) {
        announcementBar.style.display = 'none';
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Handle click interaction
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            this.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            
            // Add subtle animation to the answer
            if (!isOpen) {
                answer.style.display = 'block';
                // Force reflow
                answer.offsetHeight;
            } else {
                setTimeout(() => {
                    answer.style.display = '';
                }, 300); // Match the CSS transition time
            }
            
            // Track event
            trackEvent('click', 'faq', `faq_${index}_${isOpen ? 'close' : 'open'}`);
            
            // Add subtle haptic feedback on mobile
            if (navigator.vibrate) {
                navigator.vibrate(5);
            }
        });
        
        // Keyboard support for accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // First item opened by default if none are active
        if (index === 0 && !document.querySelector('.faq-item.active')) {
            setTimeout(() => {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.display = 'block';
            }, 500); // Slight delay for better UX
        }
    });
}

/**
 * Initialize scroll-based animations
 */
function initializeScrollAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Skip animations for users who prefer reduced motion
    }
    
    // Define elements to animate on scroll
    const animatedElements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.section-subtitle'),
        ...document.querySelectorAll('.feature-card'),
        ...document.querySelectorAll('.step-card'),
        ...document.querySelectorAll('.testimonial-card'),
        ...document.querySelectorAll('.faq-item'),
        ...document.querySelectorAll('.cta-box')
    ];
    
    // Initialization of animation observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // 15% visibility triggers animation
        rootMargin: '0px 0px -50px 0px' // Adjust timing
    });
    
    // Observe each element
    animatedElements.forEach((element, index) => {
        // Add base animation class
        element.classList.add('animate-on-scroll');
        
        // Add staggered delay based on element position
        if (element.classList.contains('feature-card') || 
            element.classList.contains('step-card') ||
            element.classList.contains('testimonial-card') ||
            element.classList.contains('faq-item')) {
            const delay = (index % 3) * 0.1; // Stagger cards within their container
            element.style.transitionDelay = `${delay}s`;
        }
        
        // Start observing
        animationObserver.observe(element);
    });
    
    // Add scroll progress indicator for long pages
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

/**
 * Floating Contact Button visibility handler
 */
function initializeFloatingCTA() {
    const floatingButton = document.querySelector('.floating-contact-btn');
    const ctaSection = document.querySelector('.cta-section');
    
    if (!floatingButton || !ctaSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingButton.classList.add('visible');
            } else {
                floatingButton.classList.remove('visible');
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    observer.observe(ctaSection);
    
    // Initial check
    if (window.scrollY + window.innerHeight > ctaSection.offsetTop) {
        floatingButton.classList.add('visible');
    } else {
        floatingButton.classList.remove('visible');
    }
    
    // Hide on scroll down, show on scroll up
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            floatingButton.classList.remove('visible');
        } else {
            if (window.scrollY + window.innerHeight > ctaSection.offsetTop) {
                floatingButton.classList.add('visible');
            }
        }
        lastScrollY = window.scrollY;
    });
    
    // Floating CTA button implementation for mobile
    const floatingCTA = document.querySelector('.floating-cta');
    if (!floatingCTA) return;
    
    // Only show on mobile devices
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    
    // Show floating CTA after user has scrolled past hero section
    const heroSection = document.querySelector('.hero');
    const scrollThreshold = heroSection ? heroSection.offsetHeight : 500;
    
    // Track scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > scrollThreshold) {
            floatingCTA.classList.add('show');
        } else {
            floatingCTA.classList.remove('show');
        }
        
        // Hide when user is near the footer or CTA section
        const footerPos = document.querySelector('.footer').getBoundingClientRect().top;
        const ctaSectionPos = document.querySelector('.cta-section').getBoundingClientRect().top;
        
        if (footerPos < window.innerHeight || ctaSectionPos < window.innerHeight) {
            floatingCTA.classList.remove('show');
        }
    });
    
    // Add touch interaction
    const ctaButton = floatingCTA.querySelector('.btn-floating');
    if (ctaButton) {
        ctaButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        });
        
        ctaButton.addEventListener('touchend', function() {
            this.style.transform = '';
            trackEvent('click', 'cta', 'floating_reserve_button');
        });
    }
}

/**
 * Initialize testimonial carousel with navigation controls and indicators
 */
function initializeTestimonialCarousel() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;
    
    const indicatorsContainer = document.querySelector('.testimonial-indicators');
    const prevButton = document.querySelector('.testimonial-control.prev');
    const nextButton = document.querySelector('.testimonial-control.next');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 1;
    const indicators = [];
    
    // Create indicators
    for (let i = 0; i < cards.length; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('testimonial-indicator');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        
        indicator.addEventListener('click', () => {
            goToSlide(i);
            updateIndicators();
        });
        
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(i);
                updateIndicators();
            }
        });
        
        indicatorsContainer.appendChild(indicator);
        indicators.push(indicator);
    }
    
    // Set up navigation buttons
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        updateIndicators();
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        updateIndicators();
    });
    
    // Handle keyboard navigation
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
            updateIndicators();
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
            updateIndicators();
        }
    });
    
    // Calculate dimensions
    function calculateDimensions() {
        if (window.innerWidth >= 1024) {
            cardsPerView = 3;
        } else if (window.innerWidth >= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 1;
        }
        
        const containerWidth = track.parentElement.offsetWidth;
        cardWidth = containerWidth / cardsPerView;
        
        cards.forEach(card => {
            card.style.flexBasis = `${cardWidth}px`;
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Handle wrapping
        if (index < 0) {
            index = Math.max(0, cards.length - cardsPerView);
        } else if (index > cards.length - cardsPerView) {
            index = 0;
        }
        
        currentIndex = index;
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        // Add subtle haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
        
        // Track event
        trackEvent('interaction', 'testimonial', `slide_${currentIndex + 1}`);
    }
    
    // Update indicators based on current slide
    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update button states
        if (currentIndex <= 0) {
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.removeAttribute('aria-disabled');
        }
        
        if (currentIndex >= cards.length - cardsPerView) {
            nextButton.setAttribute('aria-disabled', 'true');
        } else {
            nextButton.removeAttribute('aria-disabled');
        }
    }
    
    // Handle touch events for swiping on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - go to next slide
            goToSlide(currentIndex + 1);
            updateIndicators();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - go to previous slide
            goToSlide(currentIndex - 1);
            updateIndicators();
        }
    }
    
    // Initialize the carousel
    calculateDimensions();
    updateIndicators();
    indicators[0].classList.add('active');
    
    // Auto-advance slides every 5 seconds
    let autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
        updateIndicators();
    }, 5000);
    
    // Pause autoplay when interacting with carousel
    const pauseAutoplay = () => {
        clearInterval(autoplayInterval);
        // Resume after 10 seconds of inactivity
        autoplayInterval = setTimeout(() => {
            autoplayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
                updateIndicators();
            }, 5000);
        }, 10000);
    };
    
    prevButton.addEventListener('click', pauseAutoplay);
    nextButton.addEventListener('click', pauseAutoplay);
    track.addEventListener('touchstart', pauseAutoplay);
    indicators.forEach(indicator => {
        indicator.addEventListener('click', pauseAutoplay);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        calculateDimensions();
        goToSlide(currentIndex);
    });
}

/**
 * Back to top button functionality
 */
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    toggleBackToTopButton();
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add ripple effect
        createRippleEffect(e, this);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track event
        trackEvent('click', 'navigation', 'back_to_top');
    });
    
    // Show button after scrolling down
    const scrollThreshold = 300;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add haptic feedback for touch devices
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        // Animate the scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track event
        trackEvent('interaction', 'navigation', 'back_to_top');
    });
    
    // Handle keyboard interaction
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

/**
 * Initialize lazy loading for better performance
 */
function initializeLazyLoading() {
    // Use Intersection Observer to lazy load images
    if ('IntersectionObserver' in window) {
        const lazyLoadOptions = {
            root: null,
            rootMargin: '200px',
            threshold: 0
        };
        
        // For images
        const lazyLoadImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, lazyLoadOptions);
        
        lazyLoadImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        // For background images
        const lazyBackgrounds = document.querySelectorAll('[data-background]');
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.backgroundImage = `url(${element.dataset.background})`;
                    element.classList.add('loaded');
                    bgObserver.unobserve(element);
                }
            });
        }, lazyLoadOptions);
        
        lazyBackgrounds.forEach(bg => {
            bgObserver.observe(bg);
        });
        
        // For heavy sections (delay initialization)
        const heavySections = document.querySelectorAll('.lazy-section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    
                    // Initialize any intensive features in the section
                    if (section.classList.contains('testimonials-section') && 
                        !section.classList.contains('initialized')) {
                        // Re-initialize testimonial carousel when section becomes visible
                        setTimeout(() => {
                            if (typeof initializeTestimonialCarousel === 'function') {
                                initializeTestimonialCarousel();
                            }
                            section.classList.add('initialized');
                        }, 100);
                    }
                    
                    sectionObserver.unobserve(section);
                }
            });
        }, lazyLoadOptions);
        
        heavySections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
        
        document.querySelectorAll('[data-background]').forEach(element => {
            element.style.backgroundImage = `url(${element.dataset.background})`;
        });
    }
    
    // Defer non-critical CSS
    const deferredStyles = document.querySelectorAll('link[rel="preload"][as="style"]');
    deferredStyles.forEach(styleSheet => {
        styleSheet.setAttribute('rel', 'stylesheet');
    });
}
