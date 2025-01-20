const authForm = document.getElementById('authForm');
const eventForm = document.getElementById('eventForm');
const searchBar = document.getElementById('searchBar');
const eventsContainer = document.getElementById('eventsContainer');
const eventCreationSection = document.getElementById('eventCreationSection');
const authSection = document.getElementById('authSection');

// User and Event Storage
let currentUser = null;
let events = JSON.parse(localStorage.getItem('events')) || [];

// Handle User Login
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentUser = document.getElementById('username').value;
  if (currentUser) {
    alert(`Welcome, ${currentUser}!`);
    authSection.classList.add('d-none');
    eventCreationSection.classList.remove('d-none');
    displayEvents();
  }
});

// Handle Event Creation
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventDescription = document.getElementById('eventDescription').value;

  const newEvent = {
    id: Date.now(),
    name: eventName,
    date: eventDate,
    description: eventDescription,
    registrants: [],
  };

  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  eventForm.reset();
  displayEvents();
});

// Display Events
function displayEvents(searchQuery = '') {
  eventsContainer.innerHTML = '';
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredEvents.forEach((event) => {
    const eventCard = document.createElement('div');
    eventCard.className = 'col-md-4';
    eventCard.innerHTML = `
      <div class="card p-3">
        <h5 class="card-title">${event.name}</h5>
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.description}</p>
        <button class="btn btn-primary" onclick="registerForEvent(${event.id})">Register</button>
        <button class="btn btn-secondary mt-2" onclick="viewRegistrants(${event.id})">View Registrants</button>
      </div>
    `;
    eventsContainer.appendChild(eventCard);
  });
}

// Register for an Event
function registerForEvent(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (event) {
    if (!event.registrants.includes(currentUser)) {
      event.registrants.push(currentUser);
      localStorage.setItem('events', JSON.stringify(events));
      alert('Registration successful!');
    } else {
      alert('You are already registered for this event.');
    }
  }
}

// View Registrants
function viewRegistrants(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (event) {
    alert(`Registrants for ${event.name}:\n${event.registrants.join('\n') || 'No registrants yet.'}`);
  }
}

// Handle Search
searchBar.addEventListener('input', (e) => {
  displayEvents(e.target.value);
});

// Initial Load
displayEvents();
