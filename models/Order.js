class Order {
    constructor(id, personId, productId, quantity, orderDate) {
        this.id = id;
        this.personId = personId;
        this.productId = productId;
        this.quantity = quantity;
        this.orderDate= orderDate;
    }

    calculateTotal(productPrice) {
        if (productPrice < 0 || this.quantity < 0) return 0;
        return productPrice * this.quantity;
    }
     isValid() {
        return this.personId && this.productId && this.quantity > 0;
    }

   
}

module.exports = Order;