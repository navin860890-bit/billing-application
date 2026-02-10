// Billing Module
const BillingManager = {
    init: function () {
        const payNowBtn = document.getElementById('pay-now-btn');
        const printBillBtn = document.getElementById('print-bill-btn');
        const closeBillBtn = document.getElementById('close-bill-btn');

        if (payNowBtn) {
            payNowBtn.addEventListener('click', () => this.showBill());
        }

        if (printBillBtn) {
            printBillBtn.addEventListener('click', () => {
                this.markAsPaid();
                this.printBill();
            });
        }

        if (closeBillBtn) {
            closeBillBtn.addEventListener('click', () => this.closeBill());
        }
    },

    showBill: function () {
        const cart = CartManager.getCart();
        if (cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        const total = CartManager.getTotal();
        const modal = document.getElementById('bill-modal');
        const billItemsList = document.getElementById('bill-items-list');
        const billTotalAmount = document.getElementById('bill-total-amount');
        const billDate = document.getElementById('bill-date');

        // Date
        const now = new Date();
        billDate.textContent = now.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Items
        billItemsList.innerHTML = cart.map(item => `
            <div class="bill-item-row">
                <div>${this.escapeHtml(item.name)} × ${item.quantity}</div>
                <div>₹${item.total.toFixed(2)}</div>
            </div>
        `).join('');

        // Total
        billTotalAmount.textContent = `₹${total.toFixed(2)}`;

        // Generate UPI QR
        this.generateUPIQRCode(total);

        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        if (closeBtn) closeBtn.onclick = () => this.closeBill();
    },

    // ✅ AUTO UPI QR (PhonePe / GPay / Paytm)
    generateUPIQRCode: function (amount) {
        const upiId = "8608905850@ybl";
        const name = "Hotel Naveen";

        const upiURL = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

        const qrDiv = document.getElementById("qrcode");
        qrDiv.innerHTML = "";

        new QRCode(qrDiv, {
            text: upiURL,
            width: 200,
            height: 200
        });
    },

    // ✅ PAID stamp
    markAsPaid: function () {
        if (document.getElementById("paid-stamp")) return;

        const stamp = document.createElement("div");
        stamp.id = "paid-stamp";
        stamp.innerText = "PAID";
        stamp.style.color = "green";
        stamp.style.fontSize = "28px";
        stamp.style.fontWeight = "bold";
        stamp.style.textAlign = "center";
        stamp.style.marginTop = "10px";

        document.getElementById("bill-content").appendChild(stamp);
    },

    printBill: function () {
        window.print();
    },

    closeBill: function () {
        this.saveTransaction();
        const modal = document.getElementById('bill-modal');
        if (modal) modal.style.display = 'none';
    },

    saveTransaction: function () {
        const cart = CartManager.getCart();
        const total = CartManager.getTotal();
        if (cart.length === 0) return;

        const stored = localStorage.getItem('salesData');
        const salesData = stored ? JSON.parse(stored) : [];

        salesData.push({
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            items: cart,
            totalAmount: total,
            paymentStatus: "PAID"
        });

        localStorage.setItem('salesData', JSON.stringify(salesData));

        CartManager.cart = [];
        CartManager.saveCart();
        CartManager.updateCartCount();
        CartManager.render();
    },

    escapeHtml: function (text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => BillingManager.init());
