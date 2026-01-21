// Quick manual test checklist for shopping cart functionality
// Open browser DevTools console and run these commands to test

// 1. Check if cart store is accessible
console.log("Testing cart store...");

// 2. Test adding an item (run this in browser console on any page)
// This simulates what happens when you click "Add to Cart"
/*
const testProduct = {
    id: 1,
    name: "Cross Pendant Necklace",
    category: "Christian Jewellery",
    price: 45.00,
    image: "/products/cross-necklace.jpg",
    description: "A beautiful sterling silver cross pendant",
    badge: "Best Seller"
};

// Get the store and add item
const { useCartStore } = await import('./lib/store');
const store = useCartStore.getState();
store.addItem(testProduct);
console.log("Cart items:", store.items);
*/

// 3. Check localStorage
console.log("localStorage cart-storage:", localStorage.getItem('cart-storage'));

// 4. Manual testing steps:
/*
MANUAL TEST CHECKLIST:
✓ Navigate to http://localhost:3000
✓ Go to /shop page
✓ Hover over a product and click "Add" button
✓ Verify button shows "Added!" feedback
✓ Check cart badge in header shows "1"
✓ Click on a product to go to detail page
✓ Click "Add to Cart" button
✓ Verify cart badge shows "2"
✓ Navigate to /cart page
✓ Verify both items are shown
✓ Click + to increase quantity
✓ Click - to decrease quantity
✓ Click trash icon to remove item
✓ Refresh page - items should persist
✓ Check DevTools > Application > Local Storage > cart-storage
*/
