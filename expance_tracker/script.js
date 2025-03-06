// script.js
document.getElementById('expense-form').addEventListener('submit', addTransaction);

let transactions = [];

function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const transaction = {
        id: generateID(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateBalance();
    clearForm();
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function addTransactionDOM(transaction) {
    const list = document.getElementById('transaction-list');
    const item = document.createElement('li');
    
    const sign = transaction.type === 'income' ? '+' : '-';
    item.classList.add(transaction.type);
    item.innerHTML = `
        ${transaction.description} 
        <span>${sign}$${transaction.amount.toFixed(2)}</span>
    `;
    
    list.appendChild(item);
}

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' 
            ? acc + transaction.amount 
            : acc - transaction.amount;
    }, 0);

    document.getElementById('balance').textContent = balance.toFixed(2);
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}

// Initial setup
updateBalance();