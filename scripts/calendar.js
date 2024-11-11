import { showEventDetails } from './event.js';

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentDateDisplay = document.getElementById('current-date');
    
    if (!calendarGrid) {
        console.error("Error: .calendar-grid element not found");
        return;
    }

    // Set and display the current date
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    currentDateDisplay.textContent = currentDate.toDateString();

    // Populate the calendar grid
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        calendarGrid.appendChild(emptyCell);
    }

    fetch('../data/sportData.json')
        .then(response => response.json())
        .then(data => {
            const events = data.data.filter(event => {
                const eventDate = new Date(event.dateVenue);
                return eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth;
            });

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                dayCell.classList.add('day');

                if (day === currentDay) dayCell.classList.add('current-day');

                const event = events.find(e => new Date(e.dateVenue).getDate() === day);
                if (event) {
                    dayCell.classList.add('event-day');
                    dayCell.addEventListener('click', () => showEventDetails(event));
                }

                calendarGrid.appendChild(dayCell);
            }
        })
        .catch(error => console.error("Failed to load events data:", error));
});


// Function to dynamically add a new event to the calendar
function addEventToCalendar(event) {
    const eventDate = new Date(event.dateVenue);
    const eventDay = eventDate.getDate();

    // Locate the specific day cell in the calendar grid
    const dayCells = document.querySelectorAll('.calendar-grid .day');
    const dayCell = Array.from(dayCells).find(cell => parseInt(cell.textContent) === eventDay);

    if (dayCell) {
        dayCell.classList.add('event-day');
        dayCell.addEventListener('click', () => showEventDetails(event));
    } else {
        console.error(`Error: Unable to find day cell for date ${event.dateVenue}`);
    }
}

// Export the function to allow form.js to add new events dynamically
export { addEventToCalendar };