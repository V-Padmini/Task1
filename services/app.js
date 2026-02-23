const XLSX = require('xlsx');
const DataService = require('./DataService');

const workbook = XLSX.readFile('Task1.xlsx');

let persons = XLSX.utils.sheet_to_json(workbook.Sheets['Persons']);
let products = XLSX.utils.sheet_to_json(workbook.Sheets['Products']);
let orders = XLSX.utils.sheet_to_json(workbook.Sheets['Orders']);

console.log("===== PERSONS =====");
console.log(persons);

console.log("\n===== PRODUCTS =====");
console.log(products);

console.log("\n===== ORDERS =====");
console.log(orders);

persons = DataService.sortByKey(persons, 'name');
console.log("\n===== PERSONS SORTED BY NAME =====");
console.log(persons);

products = DataService.sortByKey(products, 'price');
console.log("\n===== PRODUCTS SORTED BY PRICE =====");
console.log(products);

products = DataService.updateById(products, 1, { price: 500 });
console.log("\n===== PRODUCTS AFTER UPDATE =====");
console.log(products);

orders = DataService.deleteById(orders, 4);
console.log("\n===== ORDERS AFTER DELETE =====");
console.log(orders);


const detailedOrders = DataService.getDetailedOrders(orders, persons, products);

console.log("\n===== DETAILED ORDERS =====");
console.log(detailedOrders);