const cart = {
    items: [],
    add(product) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) {
            existing.qty++;
        } else {
            this.items.push({ ...product, qty: 1 });
        }
        this.updateUI();
    },
    removeOne(id) {
        const idx = this.items.findIndex(i => i.id === Number(id));
        if (idx === -1) return;
        this.items[idx].qty -= 1;
        if (this.items[idx].qty <= 0) this.items.splice(idx, 1);
        this.updateUI();
    },
    removeAll(id) {
        const idx = this.items.findIndex(i => i.id === Number(id));
        if (idx === -1) return;
        this.items.splice(idx, 1);
        this.updateUI();
    },
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },
    updateUI() {
        const summary = document.getElementById('order-summary');
        const miniTotal = document.getElementById('mini-total');
        const billItems = document.getElementById('bill-items');
        const totalBill = document.getElementById('total-bill');

        const total = this.getTotal();

        const summaryHtml = this.items.map(item => `
            <div class="order-item" data-id="${item.id}">
                <span><strong>${item.name}</strong> <br><small>Qty: ${item.qty}</small></span>
                <span>£${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `).join('');

        const billHtml = this.items.map(item => {
            const expiryText = typeof formatExpiryDate === 'function'
                ? formatExpiryDate(item.expiryDate)
                : 'N/A';

            return `
            <div class="order-item" data-id="${item.id}">
                <span>
                    <strong>${item.name}</strong>
                    <br><small>Qty: ${item.qty}</small>
                    <br><small>Expiry: ${expiryText}</small>
                </span>
                <span>£${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
        }).join('');

        if (summary) summary.innerHTML = summaryHtml || '<p class="text-center text-muted">Your cart is empty</p>';
        if (miniTotal) miniTotal.innerText = `Total: £${total.toFixed(2)} `;
        if (billItems) billItems.innerHTML = billHtml || '<p class="text-center text-muted">Your cart is empty</p>';
        if (totalBill) totalBill.innerText = `£${total.toFixed(2)} `;
    }
};

function renderMenu(category = 'All') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filtered = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <strong>${p.name}</strong>
            <p class="product-description">${p.description || ''}</p>
            <p>£${p.price.toFixed(2)}</p>
            <p>${p.getDescription()}</p>
            <button class="btn-add" data-id="${p.id}">Add</button>
        </div>
    `).join('');
}

function renderCategories() {
    const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    const list = document.getElementById('categories-list');
    if (list) {
        list.innerHTML = cats.map(c => `<li onclick="renderMenu('${c}')">${c}</li>`).join('');
    }
}

function confirmOrder() {
    if (cart.items.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = prompt("Please enter your name:");
    if (!name || name.trim() === "") return;

    const mobile = prompt("Please enter your 10-digit mobile number:");
    if (!/^\d{10}$/.test(mobile)) {
        alert("Invalid mobile number.");
        return;
    }

    alert(`Order placed for ${name}! Total: £${cart.getTotal().toFixed(2)}`);
    cart.items = [];
    cart.updateUI();
    const modalEl = document.getElementById('billModal');
    const modal = bootstrap.Modal.getInstance(modalEl) || null;
    if (modal) modal.hide();
}


function attachGlobalHandlers() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.addEventListener('click', e => {
            const btn = e.target.closest('.btn-add');
            if (!btn) return;
            const id = Number(btn.dataset.id);
            const prod = PRODUCTS.find(p => Number(p.id) === id);
            if (prod) cart.add(prod);
        });
    }

    const orderSummary = document.getElementById('order-summary');
    if (orderSummary) {
        // single click removes one
        orderSummary.addEventListener('click', e => {
            const row = e.target.closest('.order-item');
            if (!row) return;
            const id = row.dataset.id;
            cart.removeOne(id);
        });

        
    }
}

window.onload = () => {
    if (typeof PRODUCTS === 'undefined') {
        console.error('PRODUCTS array not found');
        return;
    }
    renderCategories();
    renderMenu();
    cart.updateUI();
    attachGlobalHandlers();
};
