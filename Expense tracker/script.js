document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-expense").addEventListener("click", addExpense);
    updateUI();
});

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
    const list = document.getElementById("expense-list");
    const total = document.getElementById("total");
    list.innerHTML = "";
    let sum = 0;

    expenses.forEach((expense, index) => {
        sum += expense.amount;
        const li = document.createElement("li");
        li.className = "expense-item";
        li.innerHTML = `${expense.desc} - $${expense.amount.toFixed(2)} <button class="delete-btn" onclick="deleteExpense(${index})">X</button>`;
        list.appendChild(li);
    });

    total.innerText = sum.toFixed(2);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
    const desc = document.getElementById("desc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value.trim());

    if (desc && !isNaN(amount) && amount > 0) {
        expenses.push({ desc, amount });
        updateUI();
        document.getElementById("desc").value = "";
        document.getElementById("amount").value = "";
    } else {
        alert("Please enter a valid description and amount.");
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}
