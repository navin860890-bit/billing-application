// Cart Management Module
const CartManager = {
    cart: [],

    // Initialize cart from localStorage
    init: function() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.cart = JSON.parse(stored);
        }
        this.updateCartCount();
        this.render();
    },

    // Get cart items
    getCart: function() {
        return this.cart;
    },

    // Add item to cart
    addItem: function(itemId) {
        const menuItem = MenuManager.getById(itemId);
        if (!menuItem) {
            alert('Item not found!');
            return;
        }

        const existingItem = this.cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            this.cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
                total: menuItem.price
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.render();
        
        // Show notification
        this.showNotification(`${menuItem.name} added to cart`);
    },

    // Remove item from cart
    removeItem: function(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
        this.render();
    },

    // Update item quantity
    updateQuantity: function(itemId, quantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                item.total = item.quantity * item.price;
                this.saveCart();
                this.updateCartCount();
                this.render();
            }
        }
    },

    // Clear entire cart
    clearCart: function() {
        if (this.cart.length === 0) {
            return;
        }
        
        if (confirm('Are you sure you want to clear the cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.render();
            this.showNotification('Cart cleared');
        }
    },

    // Get cart total
    getTotal: function() {
        return this.cart.reduce((sum, item) => sum + item.total, 0);
    },

    // Get cart item count
    getItemCount: function() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Save cart to localStorage
    saveCart: function() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    // Update cart count in header
    updateCartCount: function() {
        const countElement = document.querySelector('.cart-count');
        if (countElement) {
            const count = this.getItemCount();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'inline-block' : 'none';
        }
    },

    // Render cart items
    render: function() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalElement = document.getElementById('total-amount');
        const payNowBtn = document.getElementById('pay-now-btn');

        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Cart is empty</p>';
            if (totalElement) totalElement.textContent = '₹0';
            if (payNowBtn) payNowBtn.disabled = true;
            return;
        }

        if (payNowBtn) payNowBtn.disabled = false;

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${this.escapeHtml(item.name)}</h4>
                    <p class="cart-item-price">₹${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-secondary qty-decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="btn btn-sm btn-secondary qty-increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        ₹${item.total.toFixed(2)}
                    </div>
                    <button class="btn btn-sm btn-danger remove-item-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Update total
        const total = this.getTotal();
        
        if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;

        // Attach event listeners
        this.attachEventListeners();
    },

    // Attach event listeners to cart items
    attachEventListeners: function() {
        // Quantity decrease buttons
        document.querySelectorAll('.qty-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.getAttribute('data-id');
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            });
        });

        // Quantity increase buttons
        document.querySelectorAll('.qty-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.getAttribute('data-id');
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity + 1);
                }
            });
        });

        // Remove item buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.getAttribute('data-id');
                this.removeItem(itemId);
            });
        });
    },

    // Show notification
    showNotification: function(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    },

    // Escape HTML
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CartManager.init());
} else {
    CartManager.init();
}

