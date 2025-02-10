const monthYear = document.getElementById("month-year");
const calendarDays = document.getElementById("calendar-days");
let date = new Date();

function renderCalendar() {
    calendarDays.innerHTML = "";
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    monthYear.textContent = date.toLocaleDateString('en-us', { month: 'long', year: 'numeric' });
    
    weekdays.forEach(day => {
        const div = document.createElement("div");
        div.textContent = day;
        div.classList.add("weekday");
        calendarDays.appendChild(div);
    });
    
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarDays.appendChild(emptyDiv);
    }
    
    for (let i = 1; i <= lastDate; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = i;
        dayDiv.classList.add("day");
        calendarDays.appendChild(dayDiv);
    }
}

function prevMonth() {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

renderCalendar();
