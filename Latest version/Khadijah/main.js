document.addEventListener('DOMContentLoaded', () => {

    const productInstances = PRODUCTS.map(p => new Product(p));
    const cart = new Cart(PRODUCTS);
    const renderer = new MenuRenderer(PRODUCTS, cart);

    window.confirmPayment = function(paymentMethod) {
        // 1. Check if cart is empty (encapsulated)
        if (!cart.hasItems()) {
            alert('No items in your order. Please add items before proceeding.');
            return;
        }
    }

    let payer_name = '';
    let payer_mobile = '';

    // 3. Validation: Name must not be empty at all 
    if (payer_name === "") {
        alert('Please enter your name.');
        return;
    }

    // 4. Validation: Mobile must be exactly 10 digits
    if (!/^\d{10}$/.test(payer_mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    // 5. Success: Process order
    alert(`Order submitted successfully!\nCustomer: ${payer_name}\nTotal: ${cart.getTotal().toFixed(2)} £`);

    // Clear cart and update UI
    cart.clear();
    renderer.updateMiniTotal();
    renderer.updateOrderSummary();

    // Close all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
    });
})