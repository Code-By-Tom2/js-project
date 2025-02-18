document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
        calendarDays.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDate; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.textContent = day;

            if (
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
            ) {
                dayCell.classList.add("today");
            }

            calendarDays.appendChild(dayCell);
        }
    }

    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
