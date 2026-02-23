class ExcelService {

    static readSheet(workbook, sheetName) {
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            alert(sheetName + " sheet not found!");
            return [];
        }

        return XLSX.utils.sheet_to_json(worksheet);
    }

    static displaySheet(data, tableId) {

        const table = document.getElementById(tableId);
        table.innerHTML = "";

        if (data.length === 0) return;

        const headerRow = document.createElement("tr");

        Object.keys(data[0]).forEach(key => {
            const th = document.createElement("th");
            th.innerText = key;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        data.forEach(row => {
            const tr = document.createElement("tr");

            Object.values(row).forEach(value => {
                const td = document.createElement("td");
                td.innerText = value;
                tr.appendChild(td);
            });

            table.appendChild(tr);
        });
    }
}
document.getElementById("fileInput").addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const persons = ExcelService.readSheet(workbook, "Persons");
        const products = ExcelService.readSheet(workbook, "Products");
        const orders = ExcelService.readSheet(workbook, "Orders");

        ExcelService.displaySheet(persons, "personsTable");
        ExcelService.displaySheet(products, "productsTable");
        ExcelService.displaySheet(orders, "ordersTable");

    };

    reader.readAsArrayBuffer(file);
});