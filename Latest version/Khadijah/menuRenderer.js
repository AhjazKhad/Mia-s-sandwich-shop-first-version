this.orderSummaryEl = document.getElementById('order-summary');
class MenuRenderer {
    constructor(products, cart) {
        this.products = products;
        this.cart = cart;
        this.categoriesEl = document.getElementById('categories-list');
        this.productsEl = document.getElementById('products-grid');
        this.miniTotalEl = document.getElementById('mini-total');
        this.totalBillEl = document.getElementById('total-bill');
        this.billItemsEl = document.getElementById('bill-items');

        this._attachHandlers();
        this.renderCategories();
        this.renderProducts('All');
        this.updateMiniTotal();
        this.updateOrderSummary();
    }

    renderCategories() {
        const cats = ['All', ...new Set(this.products.map(p => p.category))];
        this.categoriesEl.innerHTML = cats.map(c => `
      <li data-category="${c}">${c}</li>
    `).join('');
    }

    renderProducts(category = 'All') {
        const filtered = category === 'All' ? this.products : this.products.filter(p => p.category === category);

        this.productsEl.innerHTML = filtered.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <strong>${p.name}</strong>
        <p>£${p.price.toFixed(2)}</p>
        <p>${p.getDescription()}</p>
        <button class="btn-add" data-id="${p.id}">Add</button>
      </div>
    `).join('');
    }

    updateMiniTotal() {
        const total = this.cart.getTotal();
        if (this.miniTotalEl) this.miniTotalEl.innerText = `Total: ${total.toFixed(2)} £`;
        if (this.totalBillEl) this.totalBillEl.innerText = `${total.toFixed(2)} £`;
    }

    updateOrderSummary() {
        const items = this.cart.getItemsArray();

        const html = items.map(({ product, qty }) => `
      <div class="order-item" data-id="${product.id}" style="cursor: pointer;" title="Click to remove">
        <span><strong>${product.name}</strong> <br><small>Qty: ${qty}</small></span>
        <span>£${(product.price * qty).toFixed(2)}</span>
      </div>
    `).join('');

        this.orderSummaryEl.innerHTML = html || '<p class="empty-msg">Your cart is empty</p>';
        if (this.billItemsEl) this.billItemsEl.innerHTML = html;
    }

    _attachHandlers() {
        // Category switching
        this.categoriesEl.addEventListener('click', e => {
            const li = e.target.closest('li');
            if (li) this.renderProducts(li.dataset.category);
        });

        // Adding products
        this.productsEl.addEventListener('click', e => {
            const btn = e.target.closest('.btn-add');
            if (btn) {
                this.cart.add(Number(btn.dataset.id));
                this.updateMiniTotal();
                this.updateOrderSummary();
            }
        });

        // REMOVE functionality: Clicking the row in the cart
        this.orderSummaryEl.addEventListener('click', e => {
            const row = e.target.closest('.order-item');
            if (row) {
                const id = Number(row.dataset.id);
                this.cart.removeOne(id); // Removes 1 quantity
                this.updateMiniTotal();
                this.updateOrderSummary();
            }
        });
    }
}
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    describe() {
        console.log(`Product: ${this.name}, Price: £${this.price.toFixed(2)}`);
    }
}