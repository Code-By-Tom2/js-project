// Sample event data (could come from a database or API in a real app)
let events = [
    { id: 1, title: "Spring Concert", date: "April 15, 2025", location: "City Hall" },
    { id: 2, title: "Tech Conference", date: "May 10, 2025", location: "Convention Center" }
];

// Function to display events on the page
function displayEvents() {
    const eventSection = document.getElementById("events");
    eventSection.innerHTML = "<h2>Upcoming Events</h2>"; // Reset content

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <button onclick="buyTicket(${event.id})">Buy Tickets</button>
        `;
        eventSection.appendChild(eventCard);
    });

    // Add a form to create new events
    const form = document.createElement("div");
    form.innerHTML = `
        <h3>Add New Event</h3>
        <input type="text" id="eventTitle" placeholder="Event Title"><br>
        <input type="text" id="eventDate" placeholder="Event Date"><br>
        <input type="text" id="eventLocation" placeholder="Event Location"><br>
        <button onclick="addEvent()">Add Event</button>
    `;
    eventSection.appendChild(form);
}

// Function to handle ticket purchase
function buyTicket(eventId) {
    const event = events.find(e => e.id === eventId);
    alert(`Ticket purchased for ${event.title} on ${event.date}!`);
}

// Function to add a new event
function addEvent() {
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value;

    if (title && date && location) {
        const newEvent = {
            id: events.length + 1, // Simple ID generation
            title: title,
            date: date,
            location: location
        };
        events.push(newEvent);
        displayEvents(); // Refresh the event list
        clearForm(); // Clear the input fields
    } else {
        alert("Please fill in all fields!");
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventLocation").value = "";
}

// Load events when the page loads
window.onload = function() {
    displayEvents();
};