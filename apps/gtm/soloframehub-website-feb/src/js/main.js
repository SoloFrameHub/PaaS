/**
 * Main JavaScript for SoloFrameHub
 * Extracted from inline scripts for better performance and caching
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

  // Mobile Menu Handling
  initMobileMenu();

  // FAQ Accordion (using native <details> element)
  // No JavaScript needed - browsers handle this natively

  // Smooth scroll is handled by CSS class 'scroll-smooth' on <html>

  // Mobile menu link click handlers
  handleMobileLinks();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !closeButton || !mobileMenu) {
    return; // Elements not found on this page
  }

  // Open mobile menu
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Close mobile menu
  closeButton.addEventListener('click', () => {
    closeMobileMenu();
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
    }
  });

  // Close when clicking outside menu
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}

/**
 * Close mobile menu helper
 */
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

/**
 * Handle mobile menu link clicks
 * Close menu when any link is clicked
 */
function handleMobileLinks() {
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

/**
 * Optional: Intersection Observer for fade-in animations
 * Uncomment if you want elements to fade in on scroll
 */
/*
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}
*/
