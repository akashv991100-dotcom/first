// -------------------------------
// Cart Management Functions
// -------------------------------

// Add item to cart
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${name} added to cart!`);
}

// Remove item from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  location.reload(); // Refresh to update cart display
}

// Update item quantity
function updateQuantity(id, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === id);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Refresh to update totals
    }
  }
}

// Update cart count in navigation
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #8E6D5F;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add notification animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize cart count on page load
window.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// -------------------------------
// Smooth Scrolling for Nav Links
// -------------------------------
document.querySelectorAll('nav .menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // Only prevent default for hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetID = href.slice(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50, // adjust for header
          behavior: 'smooth'
        });
      }
    }
  });
});

// -------------------------------
// Newsletter Form Validation
// -------------------------------
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
      alert("Thank you for subscribing!");
      emailInput.value = '';
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

function validateEmail(email) {
  // simple email regex
  const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return re.test(email);
}

// -------------------------------
// Product Card Hover Effect (Optional)
// -------------------------------
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
  });
});

// -------------------------------
// Mobile Menu Toggle (Optional)
// -------------------------------
const navMenu = document.querySelector('nav .menu');
const navLogo = document.querySelector('nav .logo');

if (navLogo) {
  navLogo.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// You can add more features like slider, cart functionality, pop-ups here

// ====================================
// Scroll Animations & Interactions
// ====================================

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  const nav = document.querySelector('nav');
  
  if (!menuToggle || !menu || !nav) return;
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  document.querySelectorAll('.menu li a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

// Initialize cart count & animations on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setupScrollAnimations();
  setupSmoothScroll();
  setupParallaxEffect();
  setupButtonRippleEffect();
  setupMobileMenu();
});

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(
    '.stats, .products, .product-card, .our-story, .gift-boxes, .newsletter, footer'
  ).forEach(el => {
    observer.observe(el);
  });
}

// Parallax effect on hero section
function setupParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  });
}

// Ripple effect on button clicks
function setupButtonRippleEffect() {
  document.querySelectorAll('.btn, .btn-add-to-cart, .newsletter button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
