const XLSX = require('xlsx');
const path = require('path');
const DataService = require('../service/DataService');

const filePath = path.join(__dirname, '../Task1.xlsx');
const workbook = XLSX.readFile(filePath);

let persons = XLSX.utils.sheet_to_json(workbook.Sheets['Persons']);
let products = XLSX.utils.sheet_to_json(workbook.Sheets['Products']);
let orders = XLSX.utils.sheet_to_json(workbook.Sheets['Orders']);

console.log("===== ORIGINAL DATA =====");
console.log("Persons:", persons);
console.log("Products:", products);
console.log("Orders:", orders);

products = DataService.sortByKey(products, 'price');
orders = DataService.sortByKey(orders, 'orderDate');

console.log("\n===== AFTER SORTING =====");
console.log("Products:", products);
console.log("Orders:", orders);

products = DataService.updateById(products, 1, { price: 60000 });

console.log("\n===== AFTER UPDATES =====");
console.log("Products:", products);

orders = DataService.deleteById(orders, 4);

console.log("\n===== AFTER DELETES =====");
console.log("Orders:", orders);

workbook.Sheets['Persons'] = XLSX.utils.json_to_sheet(persons);
workbook.Sheets['Products'] = XLSX.utils.json_to_sheet(products);
workbook.Sheets['Orders'] = XLSX.utils.json_to_sheet(orders);

XLSX.writeFile(workbook, filePath);

const detailedOrders = DataService.getDetailedOrders(orders, persons, products);

console.log("\n===== DETAILED ORDERS =====");
console.log(detailedOrders);