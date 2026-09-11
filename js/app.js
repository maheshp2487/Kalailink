/**
 * KALAI LINK - Global Application State & Utilities
 */

const App = {
  // Demo State Initialization
  init() {
    this.initStorage();
    this.setupIcons();
    console.log('KALAI LINK initialized');
  },

  // Initialize LocalStorage with demo data if empty
  initStorage() {
    if (!localStorage.getItem('kalai_user')) {
      // Not logged in by default
    }

    if (!localStorage.getItem('kalai_products')) {
      // Demo products for marketplace
      const demoProducts = [
        {
          id: 'p1',
          name: 'Handwoven Palm Leaf Storage Basket',
          artisan: 'Lakshmi Devi',
          location: 'Tamil Nadu',
          price: 1350,
          category: 'Basketry',
          image: 'https://images.unsplash.com/photo-1620000627581-28562d96c9c7?auto=format&fit=crop&q=80&w=800',
          tags: ['Handmade', 'Eco-friendly', 'Traditional'],
          isAiEnhanced: true
        },
        {
          id: 'p2',
          name: 'Terracotta Painted Vase',
          artisan: 'Ram Kumar',
          location: 'Rajasthan',
          price: 850,
          category: 'Pottery',
          image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800',
          tags: ['Hand-painted', 'Home Decor'],
          isAiEnhanced: false
        },
        {
          id: 'p3',
          name: 'Kalamkari Block Print Fabric (2m)',
          artisan: 'Meera Textiles',
          location: 'Andhra Pradesh',
          price: 2100,
          category: 'Textiles',
          image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800',
          tags: ['Natural Dyes', 'Cotton'],
          isAiEnhanced: true
        }
      ];
      localStorage.setItem('kalai_products', JSON.stringify(demoProducts));
    } else {
        try {
            let cached = JSON.parse(localStorage.getItem('kalai_products'));
            let updated = false;
            cached.forEach(p => {
                if (p.id === 'p1' && !p.image.includes('1544816155')) {
                    p.image = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800';
                    updated = true;
                }
                if (p.id === 'p2' && !p.image.includes('1578500494198')) {
                    p.image = 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800';
                    updated = true;
                }
                if (p.id === 'p3' && !p.image.includes('1528698827591')) {
                    p.image = 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800';
                    updated = true;
                }
            });
            if (updated) localStorage.setItem('kalai_products', JSON.stringify(cached));
        } catch(e) {}
    }
  },

  // Toast Notification System
  showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Lucide Icons (Inline SVG for demo)
    const iconSvg = type === 'success' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // Modal System
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // We are using Lucide icons via a script tag in HTML, but this ensures they render
  setupIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Global modal close handlers
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        const modal = el.closest('.modal-overlay');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
});

// Global dropdown manager
window.toggleDropdown = function(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;
    
    if (id === "profileDropdown") {
        const other = document.getElementById("notificationDropdown");
        if (other) other.classList.remove("show");
    } else if (id === "notificationDropdown") {
        const other = document.getElementById("profileDropdown");
        if (other) other.classList.remove("show");
    }
    
    dropdown.classList.toggle("show");
};

