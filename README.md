# Hotel Naveen - Billing System

A simple and modern restaurant billing website built with vanilla HTML, CSS, and JavaScript. Features menu management, shopping cart, dynamic QR code payment, bill printing, and monthly sales reports.

## Features

### Menu Management
- **CRUD Operations**: Create, Read, Update, and Delete menu items
- **Default Items**: Pre-loaded with 9 items (Idly, Plain Dosa, Masala Dosa, Poori, Chapathi, Coffee, Tea, Vada, Pazhampuri)
- **Fixed Prices**: Menu items have fixed prices that cannot be edited (as per requirements)

### Shopping Cart
- **Add to Cart**: Click "Add to Cart" button on any menu item
- **Quantity Control**: Increase/decrease quantities directly from the cart
- **Remove Items**: Remove individual items from the cart
- **Clear Cart**: Clear entire cart with confirmation
- **Real-time Total**: Cart total updates automatically

### Billing System
- **Pay Now Button**: Generate bill with QR code
- **Dynamic QR Code**: QR code contains UPI payment link with bill amount
- **Bill Print**: Print formatted bill directly from browser
- **Transaction Saving**: Transactions are automatically saved when bill is closed

### Monthly Sales Reports
- **Monthly Filter**: Select any month/year to view reports
- **Statistics Dashboard**: View total orders, revenue, average order value, and highest order
- **Item-wise Breakdown**: See quantity sold and revenue for each menu item
- **Transaction List**: View all transactions for the selected month

## Setup Instructions

1. **Download/Clone** all files to a directory on your computer

2. **File Structure**:
   ```
   /
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   ├── app.js
   │   ├── menu.js
   │   ├── cart.js
   │   ├── billing.js
   │   └── sales.js
   └── README.md
   ```

3. **Open in Browser**:
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)
   - No server required - runs entirely in the browser
   - Works offline after initial load

4. **UPI Configuration** (Optional):
   - To use QR code payments, edit `js/billing.js`
   - Find the line: `upiId: 'your-upi-id@paytm'`
   - Replace with your actual UPI ID

## Usage Guide

### Adding Menu Items
1. Click on the "Menu" tab
2. Click "Add Item" button
3. Fill in the form (Name, Price, Category)
4. Click "Save"

### Editing Menu Items
1. Go to the "Menu" tab
2. Click the edit icon (pencil) on any menu item
3. Modify the name or category (price is fixed)
4. Click "Save"

### Deleting Menu Items
1. Go to the "Menu" tab
2. Click the delete icon (trash) on any menu item
3. Confirm deletion

### Adding Items to Cart
1. Click "Add to Cart" button on any menu item
2. Items are added to the cart automatically
3. View cart by clicking the "Cart" tab

### Managing Cart
1. Click the "Cart" tab to view all items
2. Use +/- buttons to adjust quantities
3. Click trash icon to remove individual items
4. Click "Clear Cart" to remove all items

### Generating Bill
1. Add items to cart
2. Click "Pay Now" button
3. Bill modal opens with QR code and itemized list
4. Scan QR code to pay via UPI
5. Click "Print Bill" to print the bill
6. Click "Close" to save transaction and clear cart

### Viewing Sales Reports
1. Click the "Reports" tab
2. Select a month/year from the date picker
3. Click "Generate Report"
4. View statistics, item breakdown, and transaction list

## Data Storage

All data is stored in the browser's **localStorage**:
- Menu items are stored as `menuItems`
- Cart items are stored as `cart`
- Sales/transaction data is stored as `salesData`

**Note**: Data is browser-specific and will be lost if:
- Browser cache is cleared
- Using incognito/private mode
- Switching browsers

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

Requires JavaScript to be enabled.

## Default Menu Items

| Item | Price (₹) |
|------|-----------|
| Idly | 30 |
| Plain Dosa | 40 |
| Masala Dosa | 60 |
| Poori | 50 |
| Chapathi | 35 |
| Coffee | 25 |
| Tea | 20 |
| Vada | 30 |
| Pazhampuri | 45 |

## Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling with modern features (Grid, Flexbox, Gradients)
- **Vanilla JavaScript**: All functionality without frameworks
- **QRCode.js**: QR code generation (loaded via CDN)
- **Font Awesome**: Icons (loaded via CDN)
- **localStorage API**: Data persistence

## License

Free to use for personal and commercial projects.

## Support

For issues or questions, please check the code comments or modify as needed for your requirements.


