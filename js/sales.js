// Sales Reports Module
const SalesManager = {
    // Initialize sales reports
    init: function() {
        const generateBtn = document.getElementById('generate-report-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateReport());
        }

        // Set current month as default
        const monthInput = document.getElementById('report-month');
        if (monthInput) {
            const now = new Date();
            const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
            monthInput.value = currentMonth;
        }
    },

    // Get all sales data
    getAllSales: function() {
        const stored = localStorage.getItem('salesData');
        return stored ? JSON.parse(stored) : [];
    },

    // Get sales for a specific month
    getSalesByMonth: function(year, month) {
        const allSales = this.getAllSales();
        return allSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate.getFullYear() === year && saleDate.getMonth() === month - 1;
        });
    },

    // Generate monthly report
    generateReport: function() {
        const monthInput = document.getElementById('report-month');
        const reportsContent = document.getElementById('reports-content');

        if (!monthInput || !reportsContent) return;

        const selectedMonth = monthInput.value;
        if (!selectedMonth) {
            reportsContent.innerHTML = '<p class="empty-report">Please select a month</p>';
            return;
        }

        const [year, month] = selectedMonth.split('-').map(Number);
        const monthlySales = this.getSalesByMonth(year, month);

        if (monthlySales.length === 0) {
            reportsContent.innerHTML = '<p class="empty-report">No sales data found for the selected month</p>';
            return;
        }

        // Calculate statistics
        const stats = this.calculateStatistics(monthlySales);
        const itemBreakdown = this.getItemBreakdown(monthlySales);

        // Render report
        reportsContent.innerHTML = `
            <div class="report-summary">
                <h3>Summary for ${this.getMonthName(month)} ${year}</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Orders</div>
                        <div class="stat-value">${stats.totalOrders}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Total Revenue</div>
                        <div class="stat-value">₹${stats.totalRevenue.toFixed(2)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Average Order Value</div>
                        <div class="stat-value">₹${stats.averageOrderValue.toFixed(2)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Highest Order</div>
                        <div class="stat-value">₹${stats.highestOrder.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            <div class="item-breakdown">
                <h3>Item-wise Breakdown</h3>
                <table class="sales-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity Sold</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(itemBreakdown).map(([itemName, data]) => `
                            <tr>
                                <td>${this.escapeHtml(itemName)}</td>
                                <td>${data.quantity}</td>
                                <td>₹${data.revenue.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="transaction-list">
                <h3>All Transactions</h3>
                <table class="sales-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${monthlySales.map(sale => `
                            <tr>
                                <td>${this.formatDate(sale.date)}</td>
                                <td>${sale.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>
                                <td>₹${sale.totalAmount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // Calculate statistics
    calculateStatistics: function(sales) {
        const totalOrders = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const highestOrder = sales.length > 0 
            ? Math.max(...sales.map(sale => sale.totalAmount))
            : 0;

        return {
            totalOrders,
            totalRevenue,
            averageOrderValue,
            highestOrder
        };
    },

    // Get item-wise breakdown
    getItemBreakdown: function(sales) {
        const breakdown = {};

        sales.forEach(sale => {
            sale.items.forEach(item => {
                if (!breakdown[item.name]) {
                    breakdown[item.name] = {
                        quantity: 0,
                        revenue: 0
                    };
                }
                breakdown[item.name].quantity += item.quantity;
                breakdown[item.name].revenue += item.total;
            });
        });

        // Sort by revenue (descending)
        const sorted = Object.entries(breakdown)
            .sort((a, b) => b[1].revenue - a[1].revenue)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        return sorted;
    },

    // Get month name
    getMonthName: function(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1];
    },

    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Escape HTML
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize sales manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SalesManager.init());
} else {
    SalesManager.init();
}


