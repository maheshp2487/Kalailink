/**
 * Navigation and Mobile Menu Handling
 */
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      // Toggle a class to show/hide menu on mobile
      navLinks.classList.toggle('active');
      
      // Simple visual toggle for the hamburger icon
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--color-surface)';
        navLinks.style.padding = 'var(--spacing-lg)';
        navLinks.style.borderBottom = '1px solid var(--color-border)';
        navLinks.style.boxShadow = 'var(--shadow-md)';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

  // Handle active state for sidebar links based on current URL
  const currentPath = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.sidebar-item, .nav-item, .bottom-nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });

  // Page transition effect (fade in already handled by CSS animation, 
  // we can add exit animations here if needed for a smoother SPA feel)
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && 
        !link.hash && 
        !link.target) {
      link.addEventListener('click', (e) => {
        // Just for a very slight delay to show active states if we wanted
        // e.preventDefault();
        // document.body.style.opacity = '0';
        // setTimeout(() => window.location = link.href, 150);
      });
    }
  });
});
