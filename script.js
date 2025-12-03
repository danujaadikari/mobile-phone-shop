// Product Data
const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        brand: 'apple',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1696446702883-74365bb4f28b?w=400',
        specs: '256GB, A17 Pro, Titanium'
    },
    {
        id: 2,
        name: 'iPhone 14 Pro',
        brand: 'apple',
        price: 999,
        image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400',
        specs: '128GB, A16 Bionic, Dynamic Island'
    },
    {
        id: 3,
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'samsung',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        specs: '512GB, Snapdragon 8 Gen 3, S Pen'
    },
    {
        id: 4,
        name: 'Samsung Galaxy Z Fold 5',
        brand: 'samsung',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1678911820864-e5c67c6e2b2e?w=400',
        specs: '256GB, Foldable Display, 120Hz'
    },
    {
        id: 5,
        name: 'Google Pixel 8 Pro',
        brand: 'google',
        price: 999,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
        specs: '256GB, Tensor G3, AI Camera'
    },
    {
        id: 6,
        name: 'Google Pixel 8',
        brand: 'google',
        price: 699,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        specs: '128GB, Tensor G3, Magic Eraser'
    },
    {
        id: 7,
        name: 'iPhone 15',
        brand: 'apple',
        price: 799,
        image: 'https://images.unsplash.com/photo-1592286927505-355f321f3322?w=400',
        specs: '128GB, A16 Bionic, 48MP Camera'
    },
    {
        id: 8,
        name: 'Samsung Galaxy S23',
        brand: 'samsung',
        price: 799,
        image: 'https://images.unsplash.com/photo-1583573607873-4ea1e8ac9c7a?w=400',
        specs: '128GB, Snapdragon 8 Gen 2, 120Hz'
    }
];

// Cart Management
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    loadCartFromStorage();
});

// Load products to the page
function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.brand === filter);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-specs">${product.specs}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            loadProducts(filter);
        });
    });

    // Cart modal
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartUI();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Proceeding to checkout... (This is a demo)');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToStorage();
    showNotification('Product added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartUI();
    saveCartToStorage();
    showNotification('Product removed from cart!');
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart modal UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('mobiplus_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mobiplus_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation
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
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
