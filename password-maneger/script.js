const passwordForm = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');

// Event listener for form submission
passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const website = document.getElementById('website').value;
    const password = document.getElementById('password').value;

    if (website && password) {
        addPasswordItem(website, password);
        passwordForm.reset();
    }
});

// Function to add a password item to the list
function addPasswordItem(website, password) {
    const passwordItem = document.createElement('div');
    passwordItem.className = 'password-item';

    const websiteSpan = document.createElement('span');
    websiteSpan.textContent = `${website}: ${password}`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        passwordList.removeChild(passwordItem);
    });

    passwordItem.appendChild(websiteSpan);
    passwordItem.appendChild(deleteButton);
    passwordList.appendChild(passwordItem);
}
