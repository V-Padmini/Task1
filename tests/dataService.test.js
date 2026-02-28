const XLSX = require('xlsx');
const DataService = require('../src/service/DataService');
const Order = require('../src/model/Order');

const workbook = XLSX.readFile('src/Task1.xlsx');

const persons = XLSX.utils.sheet_to_json(workbook.Sheets['Persons']);
const products = XLSX.utils.sheet_to_json(workbook.Sheets['Products']);
const orders = XLSX.utils.sheet_to_json(workbook.Sheets['Orders']);


describe("DataService Tests (Excel Data)", () => {

    test("findById should return correct person from Excel", () => {
        const firstPerson = persons[0];
        const result = DataService.findById(persons, firstPerson.id);
        console.log(result);

        expect(result).toEqual(firstPerson);
    });

    test("filterByKey should return orders for a valid personId", () => {
        const personId = orders[0].personId;

        const result = DataService.filterByKey(orders, "personId", personId);
        console.log(result);

        expect(result.length).toBeGreaterThan(0);
    });

    test("filterByKey should return empty array for invalid personId", () => {
        const result = DataService.filterByKey(orders, "personId", 9999);
        console.log(result);

        expect(result).toEqual([]);
    });

});


describe("Order Class Tests (Excel Data)", () => {

    test("calculateTotal should calculate correct total using Excel price", () => {

        const firstOrder = orders[0];
        const product = DataService.findById(products, firstOrder.productId);

        const order = new Order(
            firstOrder.id,
            firstOrder.personId,
            firstOrder.productId,
            firstOrder.quantity
        );

        const total = order.calculateTotal(product.price);
        console.log(total);

        expect(total).toBe(product.price * firstOrder.quantity);
    });


   test("isValid should return false if quantity is 0", () => {

    const firstOrder = orders[0];

    const order = new Order(
        firstOrder.id,
        firstOrder.personId,
        firstOrder.productId,
        0
    );

    const result = order.isValid();

    console.log("isValid Result:", result);

    expect(result).toBe(false);
});
});