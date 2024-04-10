document.addEventListener("DOMContentLoaded", function() {
    // Get reference to elements
    const expenseCategory = document.getElementById('expenseCategory');
    const expenseCost = document.getElementById('expenseCost');
    const expenseTitle = document.getElementById('expenseTitle');
    const expenseDate = document.getElementById('expenseDate');
    const addExpenseBtn = document.getElementById('addExpense');
    const expensesTable = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];
    const totalAmount = document.getElementById('total-amount');
    const exportCSVBtn = document.getElementById('exportCSV');

    let total = 0;

    // Add event listener to addExpense button
    addExpenseBtn.addEventListener('click', function() {
        // Get values from input fields
        const category = expenseCategory.value;
        const cost = parseFloat(expenseCost.value);
        const title = expenseTitle.value;
        const date = expenseDate.value;

        // Validate cost
        if (isNaN(cost) || cost <= 0) {
            alert("Please enter a valid expense cost.");
            return;
        }

        // Add row to expenses table
        const newRow = expensesTable.insertRow();
        newRow.innerHTML = `<td>${category}</td>
                            <td>${cost}</td>
                            <td>${title}</td>
                            <td>${date}</td>`;

        // Update total based on category
        if (category === 'income') {
            total += cost;
        } else if (category === 'expenses') {
            total -= cost;
        }

        // Update total amount display
        totalAmount.textContent = total.toFixed(2);

        // Clear input fields
        expenseCost.value = '';
        expenseTitle.value = '';
        expenseDate.value = '';
    });

    // Function to export table data to CSV
    function exportToCSV() {
        const rows = expensesTable.querySelectorAll("tbody tr");
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(row => {
            const rowData = [];
            for (let i = 0; i < row.cells.length; i++) {
                rowData.push(row.cells[i].textContent);
            }
            csvContent += rowData.join(",") + "\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expenses.csv");
        document.body.appendChild(link);
        link.click();
    }

    // Event listener for exporting to CSV
    exportCSVBtn.addEventListener("click", exportToCSV);
});
