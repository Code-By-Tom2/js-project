// Data and Constants
let expenses = [];
let filteredExpenses = [];
const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];
const budgetLimit = 1000;
let barChart, pieChart;

const lightModeColors = ['#36a2eb'];
const darkModeColors = ['#66b0ff'];
const pieColors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

// DOM Elements
const expenseForm = document.getElementById('add-expense-form');
const expenseItems = document.getElementById('expense-items');
const filterCategory = document.getElementById('filter-category');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const searchInput = document.getElementById('search');
const totalSpendingElement = document.getElementById('total-spending');
const budgetAlert = document.getElementById('budget-alert');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Initialization
function init() {
    expenses = loadFromLocalStorage();
    filteredExpenses = [...expenses];
    renderExpenses();
    updateDashboard();
    setupEventListeners();
    applyDarkModePreference();
}

function setupEventListeners() {
    expenseForm.addEventListener('submit', addExpense);
    expenseItems.addEventListener('click', handleDelete);
    filterCategory.addEventListener('change', filterExpenses);
    startDate.addEventListener('change', filterExpenses);
    endDate.addEventListener('change', filterExpenses);
    searchInput.addEventListener('input', filterExpenses);
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Expense Management
function addExpense(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const id = Date.now();

    const expense = { id, amount, category, date };
    expenses.push(expense);
    filteredExpenses = [...expenses];
    saveToLocalStorage();
    renderExpenses();
    updateDashboard();
    expenseForm.reset();
}

function handleDelete(event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = parseInt(event.target.parentElement.dataset.id);
        expenses = expenses.filter(exp => exp.id !== id);
        filteredExpenses = [...expenses];
        saveToLocalStorage();
        renderExpenses();
        updateDashboard();
    }
}

function renderExpenses() {
    expenseItems.innerHTML = filteredExpenses.length === 0 
        ? '<p>No expenses to display.</p>'
        : filteredExpenses.map(exp => `
            <div class="expense-item" data-id="${exp.id}">
                <span>$${exp.amount.toFixed(2)}</span>
                <span>${exp.category}</span>
                <span>${exp.date}</span>
                <button class="delete-btn">Delete</button>
            </div>
        `).join('');
}

// Filtering
function filterExpenses() {
    const category = filterCategory.value;
    const start = startDate.value;
    const end = endDate.value;
    const keyword = searchInput.value.toLowerCase();

    filteredExpenses = expenses.filter(exp => {
        const categoryMatch = category === 'All' || exp.category === category;
        const dateMatch = (!start || exp.date >= start) && (!end || exp.date <= end);
        const searchMatch = !keyword || exp.category.toLowerCase().includes(keyword);
        return categoryMatch && dateMatch && searchMatch;
    });

    renderExpenses();
    updateDashboard();
}

// Dashboard and Charts
function updateDashboard() {
    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalSpendingElement.textContent = totalSpending.toFixed(2);
    budgetAlert.classList.toggle('hidden', totalSpending <= budgetLimit);

    updateCharts();
}

function updateCharts() {
    const monthlySpending = groupByMonth(filteredExpenses);
    const categorySpending = groupByCategory(filteredExpenses);

    if (!barChart) {
        barChart = new Chart(document.getElementById('bar-chart'), {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Spending by Month', data: [], backgroundColor: lightModeColors[0] }] },
            options: { scales: { y: { beginAtZero: true } } }
        });
        pieChart = new Chart(document.getElementById('pie-chart'), {
            type: 'pie',
            data: { labels: [], datasets: [{ data: [], backgroundColor: pieColors }] }
        });
    }

    barChart.data.labels = Object.keys(monthlySpending).sort();
    barChart.data.datasets[0].data = barChart.data.labels.map(key => monthlySpending[key]);
    pieChart.data.labels = Object.keys(categorySpending);
    pieChart.data.datasets[0].data = pieChart.data.labels.map(key => categorySpending[key]);

    barChart.update();
    pieChart.update();
}

function groupByMonth(expenses) {
    const monthly = {};
    expenses.forEach(exp => {
        const [year, month] = exp.date.split('-').slice(0, 2);
        const key = `${year}-${month}`;
        monthly[key] = (monthly[key] || 0) + exp.amount;
    });
    return monthly;
}

function groupByCategory(expenses) {
    const category = {};
    expenses.forEach(exp => {
        category[exp.category] = (category[exp.category] || 0) + exp.amount;
    });
    return category;
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    barChart.data.datasets[0].backgroundColor = isDarkMode ? darkModeColors[0] : lightModeColors[0];
    barChart.update();
}

function applyDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (barChart) barChart.data.datasets[0].backgroundColor = darkModeColors[0];
    }
}

// Start the app
init();