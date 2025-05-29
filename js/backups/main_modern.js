// Modern Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Modern Landing Page Loaded');
    
    // Initialize core features
    initializeCloseAnnouncement();
    initializeButtonInteractions();
    initializeResponsiveFeatures();
    initializeAnimations();
});

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
 * Enhanced button interactions with hover effects
 */
function initializeButtonInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px)';
        });
    });
    
    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-trial');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('CTA button clicked:', this.textContent.trim());
            trackEvent('click', 'cta', this.textContent.trim());
        });
    });
    
    // Dropdown menu handling (if needed)
    const dropdownLinks = document.querySelectorAll('.nav-link.has-dropdown');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Dropdown clicked:', this.textContent.trim());
        });
    });
}

/**
 * Handle responsive features
 */
function initializeResponsiveFeatures() {
    // Check if we need to initialize mobile navigation
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 768) {
        // Here we would initialize a mobile menu if needed
        console.log('Mobile view detected - menu features would initialize here');
    }
    
    // Listen for resize events
    window.addEventListener('resize', function() {
        const newWidth = window.innerWidth;
        
        // Handle resize logic if needed
        if (newWidth <= 768 && windowWidth > 768) {
            // Switched to mobile
            console.log('Switched to mobile view');
        } else if (newWidth > 768 && windowWidth <= 768) {
            // Switched to desktop
            console.log('Switched to desktop view');
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
}

/**
 * Track events for analytics
 */
function trackEvent(eventType, category, label) {
    // Here we would normally connect to analytics platforms
    console.log(`[ANALYTICS] Event tracked: ${eventType} | ${category} | ${label}`);
    
    // Google Analytics implementation would go here
    if (typeof gtag === 'function') {
        gtag('event', eventType, {
            'event_category': category,
            'event_label': label
        });
    }
}
