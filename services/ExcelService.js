class ExcelService {

    static readSheet(workbook, sheetName) {
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) return [];

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