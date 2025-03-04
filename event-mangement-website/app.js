let events = [];

// Load events from local storage
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
}

// Save events to local storage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Render the event list, sorted by date and time
function renderEventList() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    const sortedEvents = events.slice().sort((a, b) => {
        if (a.date === b.date) return a.time.localeCompare(b.time);
        return a.date.localeCompare(b.date);
    });
    sortedEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.date} at ${event.time}</p>
            <p>${event.description.substring(0, 100)}...</p>
            <button onclick="viewDetails('${event.id}')">View Details</button>
            <button onclick="deleteEvent('${event.id}')">Delete</button>
        `;
        eventList.appendChild(eventDiv);
    });
}

// View event details
function viewDetails(id) {
    location.hash = `#details/${id}`;
}

// Render event details
function renderEventDetails(id) {
    const event = events.find(e => e.id === id);
    const detailsDiv = document.getElementById('event-details');
    if (event) {
        detailsDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
        `;
    } else {
        detailsDiv.innerHTML = '<p>Event not found.</p>';
    }
}

// Delete an event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(e => e.id !== id);
        saveEvents();
        renderEventList();
    }
}

// Handle form submission to create a new event
document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newEvent = {
        id: Date.now().toString(),
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };
    events.push(newEvent);
    saveEvents();
    this.reset();
    location.hash = '#home';
});

// Show the appropriate section based on the hash
function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Handle hash changes for navigation
window.addEventListener('hashchange', function() {
    const hash = location.hash;
    if (hash === '#home' || hash === '') {
        showSection('home');
        renderEventList();
    } else if (hash.startsWith('#details/')) {
        const id = hash.split('/')[1];
        showSection('details');
        renderEventDetails(id);
    } else if (hash === '#create') {
        showSection('create');
    } else {
        showSection('home');
        renderEventList();
    }
});

// Initial load
loadEvents();
if (location.hash === '#home' || location.hash === '') {
    showSection('home');
    renderEventList();
} else if (location.hash.startsWith('#details/')) {
    const id = location.hash.split('/')[1];
    showSection('details');
    renderEventDetails(id);
} else if (location.hash === '#create') {
    showSection('create');
}