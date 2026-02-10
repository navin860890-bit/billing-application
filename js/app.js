// Main Application Initialization
const App = {
    // Initialize the application
    init: function() {
        // Initialize all modules
        this.initTabs();
        this.initMenuModal();
        this.initClearCart();
        
        // Modules are auto-initialized, but ensure they're ready
        if (typeof MenuManager !== 'undefined') {
            MenuManager.init();
        }
        if (typeof CartManager !== 'undefined') {
            CartManager.init();
        }
        if (typeof BillingManager !== 'undefined') {
            BillingManager.init();
        }
        if (typeof SalesManager !== 'undefined') {
            SalesManager.init();
        }
    },

    // Initialize tab navigation
    initTabs: function() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    },

    // Initialize menu modal (add button)
    initMenuModal: function() {
        const addMenuBtn = document.getElementById('add-menu-btn');
        if (addMenuBtn) {
            addMenuBtn.addEventListener('click', () => {
                if (typeof MenuManager !== 'undefined') {
                    MenuManager.openEditModal();
                }
            });
        }
    },

    // Initialize clear cart button
    initClearCart: function() {
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (typeof CartManager !== 'undefined') {
                    CartManager.clearCart();
                }
            });
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}


