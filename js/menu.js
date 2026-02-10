// Menu Management Module
const MenuManager = {
    defaultItems: [
        // Note: Image URLs can be updated via the Edit menu item feature
        // You can also replace these URLs with your own image URLs
        { id: '1', name: 'Idly', price: 30, category: 'breakfast', image: 'https://thumbs.dreamstime.com/z/many-idli-idly-chutney-powder-popular-homemade-breakfast-kerala-tamil-nadu-south-india-sri-lanka-arranged-banana-189827476.jpg' },
        { id: '2', name: 'Plain Dosa', price: 40, category: 'breakfast', image: 'https://img.freepik.com/premium-psd/set-dosa-masala-dosa-mysore-masala-dosa-thali-plain-dosa-indian-thali-dosai-dosa-dosas_396469-29.jpg?w=2000' },
        { id: '3', name: 'Masala Dosa', price: 60, category: 'breakfast', image: 'https://i.cdn.newsbytesapp.com/images/l77220240122104639.jpeg' },
        { id: '4', name: 'Poori', price: 50, category: 'breakfast', image: 'https://tse1.mm.bing.net/th/id/OIP.R6vitHbTEeDgw7JGZH4HhwHaFU?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: '5', name: 'Chapathi', price: 35, category: 'lunch', image: 'https://tse4.mm.bing.net/th/id/OIP.RP2bhlWYt0HTsmYMi9HEWQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: '6', name: 'Coffee', price: 25, category: 'beverages', image: 'https://gimmedelicious.com/wp-content/uploads/2021/04/Keto-Bullet-Proof-Coffee-3-750x971.jpg' },
        { id: '7', name: 'Tea', price: 20, category: 'beverages', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/indian-masala-chai-tea.jpg.webp' },
        { id: '8', name: 'Vada', price: 30, category: 'snacks', image: 'https://static.vecteezy.com/system/resources/previews/015/933/775/non_2x/sambar-vada-or-medu-vadai-with-sambhar-and-chutney-popular-south-indian-snack-or-breakfast-free-photo.jpg' },
        { id: '9', name: 'Pazhampuri', price: 45, category: 'snacks', image: 'https://i.pinimg.com/736x/d2/2a/85/d22a853f5808c36651c32ece1f399655.jpg' }
    ],

    // Initialize menu - load from localStorage or use defaults
    init: function() {
        const stored = localStorage.getItem('menuItems');
        if (!stored) {
            localStorage.setItem('menuItems', JSON.stringify(this.defaultItems));
        }
        this.render();
    },

    // Get all menu items
    getAll: function() {
        const stored = localStorage.getItem('menuItems');
        return stored ? JSON.parse(stored) : this.defaultItems;
    },

    // Get a single menu item by ID
    getById: function(id) {
        const items = this.getAll();
        return items.find(item => item.id === id);
    },

    // Add new menu item
    add: function(itemData) {
        const items = this.getAll();
        const newItem = {
            id: Date.now().toString(),
            name: itemData.name,
            price: parseFloat(itemData.price),
            category: itemData.category || 'snacks',
            image: itemData.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
        };
        items.push(newItem);
        localStorage.setItem('menuItems', JSON.stringify(items));
        this.render();
        return newItem;
    },

    // Update menu item
    update: function(id, itemData) {
        const items = this.getAll();
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index].name = itemData.name;
            items[index].category = itemData.category || items[index].category;
            if (itemData.image) {
                items[index].image = itemData.image;
            }
            // Price remains fixed as per requirements
            localStorage.setItem('menuItems', JSON.stringify(items));
            this.render();
            return items[index];
        }
        return null;
    },

    // Delete menu item
    delete: function(id) {
        const items = this.getAll();
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('menuItems', JSON.stringify(filtered));
        this.render();
    },

    // Render menu items to the DOM
    render: function() {
        const menuGrid = document.getElementById('menu-grid');
        if (!menuGrid) return;

        const items = this.getAll();
        
        if (items.length === 0) {
            menuGrid.innerHTML = '<p class="empty-menu">No menu items. Add some items to get started.</p>';
            return;
        }

        menuGrid.innerHTML = items.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-item-image">
                    <img src="${item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'}" alt="${this.escapeHtml(item.name)}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'; this.onerror=null;">
                </div>
                <div class="menu-item-info">
                    <h3>${this.escapeHtml(item.name)}</h3>
                    <p class="menu-item-price">₹${item.price.toFixed(2)}</p>
                    <p class="menu-item-category">${this.getCategoryLabel(item.category)}</p>
                </div>
                <div class="menu-item-actions">
                    <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-sm btn-secondary edit-menu-btn" data-id="${item.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-menu-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Attach event listeners
        this.attachEventListeners();
    },

    // Get category label
    getCategoryLabel: function(category) {
        const labels = {
            'breakfast': 'Breakfast',
            'lunch': 'Lunch',
            'snacks': 'Snacks',
            'beverages': 'Beverages'
        };
        return labels[category] || category;
    },

    // Escape HTML to prevent XSS
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Attach event listeners to menu items
    attachEventListeners: function() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-id');
                if (typeof CartManager !== 'undefined') {
                    CartManager.addItem(itemId);
                }
            });
        });

        // Edit buttons
        document.querySelectorAll('.edit-menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-id');
                this.openEditModal(itemId);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this item?')) {
                    this.delete(itemId);
                }
            });
        });
    },

    // Open modal for adding/editing
    openEditModal: function(itemId = null) {
        const modal = document.getElementById('menu-modal');
        const form = document.getElementById('menu-form');
        const title = document.getElementById('modal-title');
        const idInput = document.getElementById('menu-item-id');
        const nameInput = document.getElementById('menu-item-name');
        const priceInput = document.getElementById('menu-item-price');
        const categoryInput = document.getElementById('menu-item-category');
        const imageInput = document.getElementById('menu-item-image');

        if (itemId) {
            // Edit mode
            const item = this.getById(itemId);
            if (item) {
                title.textContent = 'Edit Menu Item';
                idInput.value = item.id;
                nameInput.value = item.name;
                priceInput.value = item.price;
                priceInput.disabled = true; // Price is fixed, cannot be edited
                categoryInput.value = item.category;
                if (imageInput) imageInput.value = item.image || '';
            }
        } else {
            // Add mode
            title.textContent = 'Add Menu Item';
            form.reset();
            idInput.value = '';
            priceInput.disabled = false;
            if (imageInput) imageInput.value = '';
        }

        modal.style.display = 'block';

        // Close modal handlers
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = document.getElementById('cancel-menu-btn');

        const closeModal = () => {
            modal.style.display = 'none';
            form.reset();
        };

        closeBtn.onclick = closeModal;
        cancelBtn.onclick = closeModal;

        window.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };

        // Form submit
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = {
                name: nameInput.value.trim(),
                price: parseFloat(priceInput.value),
                category: categoryInput.value,
                image: imageInput ? imageInput.value.trim() : ''
            };

            if (itemId) {
                this.update(itemId, formData);
            } else {
                this.add(formData);
            }
            closeModal();
        };
    }
};

// Initialize menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MenuManager.init());
} else {
    MenuManager.init();
}

