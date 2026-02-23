class DataService {

    static findById(array, id) {
        return array.find(item => item.id === id);
    }

    static filterByKey(array, key, value) {
        return array.filter(item => item[key] === value);
    }


    static sortByKey(array, key) {
        return [...array].sort((a, b) => a[key] - b[key]);
    }

    static deleteById(array, id) {
        return array.filter(item => item.id !== id);
    }

    static updateById(array, id, updatedData) {
        return array.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        );
    }
    
    static getDetailedOrders(orders, persons, products) {

    return orders.map(order => {

        const person = this.findById(persons, order.personId);
        const product = this.findById(products, order.productId);

        return {
            orderId: order.id,
            personName: person ? person.name : "Unknown",
            productName: product ? product.name : "Unknown",
            quantity: order.quantity,
            total: product ? product.price * order.quantity : 0
        };
    });

}
}

module.exports = DataService;