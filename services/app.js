const XLSX = require('xlsx');
const DataService = require('./DataService');

const workbook = XLSX.readFile('Task1.xlsx');

const persons = XLSX.utils.sheet_to_json(workbook.Sheets['Persons']);
const products = XLSX.utils.sheet_to_json(workbook.Sheets['Products']);
const orders = XLSX.utils.sheet_to_json(workbook.Sheets['Orders']);

console.log("===== PERSONS =====");
console.log(persons);

console.log("\n===== PRODUCTS =====");
console.log(products);

console.log("\n===== ORDERS =====");
console.log(orders);

// Get detailed orders
const detailedOrders = DataService.getDetailedOrders(orders, persons, products);

console.log("\n===== DETAILED ORDERS =====");
console.log(detailedOrders);