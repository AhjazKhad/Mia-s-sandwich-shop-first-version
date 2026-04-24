class Cart {
  constructor(products) {
    // products: reference to PRODUCTS array
    this.products = products;
    this.items = new Map(); // key: productId, value: { product, qty }
  }

  add(productId) {
    const prodData = this.products.find(p => p.id === Number(productId));
    if (!prodData) return;
    const id = prodData.id;
    if (!this.items.has(id)) {
      this.items.set(id, { product: prodData, qty: 1 });
    } else {
      this.items.get(id).qty += 1;
    }
  }

  removeOne(productId) {
    const entry = this.items.get(Number(productId));
    if (!entry) return;
    entry.qty -= 1;
    if (entry.qty <= 0) this.items.delete(Number(productId));
  }

  removeAll(productId) {
    this.items.delete(Number(productId));
  }

  clear() {
    this.items.clear();
  }

  getTotal() {
    let total = 0;
    for (const { product, qty } of this.items.values()) {
      total += product.price * qty;
    }
    return Number(total.toFixed(2));
  }

  getItemsArray() {
    return Array.from(this.items.values()).map(({product, qty}) => ({ product, qty }));
  }
}