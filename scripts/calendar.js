import { showEventDetails } from './event.js';

const eventsByDate = {};

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentDateDisplay = document.getElementById('current-date');
    const dayLabelsContainer = document.querySelector('.day-labels'); // Ensure weekday labels are set
    
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

    // Set weekday labels to start from Monday and populate dayLabelsContainer
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (dayLabelsContainer) {
        dayLabelsContainer.innerHTML = ''; // Clear existing labels
        dayLabels.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.classList.add('day-label');
            dayLabel.textContent = day;
            dayLabelsContainer.appendChild(dayLabel);
        });
    }

    // Populate the calendar grid, starting the week on Monday
    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Adjust Sunday to Monday-based index
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        calendarGrid.appendChild(emptyCell);
    }

    fetch('../data/sportData.json')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(event => {
                const eventDate = new Date(event.dateVenue);
                const eventDay = eventDate.getDate();

                // Ensure event is within the current month and year
                if (eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth) {    
                    // Initialize array if no events exist for this date
                    if (!eventsByDate[eventDay]) {
                        eventsByDate[eventDay] = [];
                    }
                    eventsByDate[eventDay].push(event); // Add event to the date
                }
            });

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                dayCell.classList.add('day');

                if (day === currentDay) dayCell.classList.add('current-day');

                // If events exist for this day, apply event-day style and add click event
                if (eventsByDate[day]) {
                    dayCell.classList.add('event-day');
                    dayCell.addEventListener('click', () => showEventDetails(eventsByDate[day]));
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

    // Update calendar grid styling
    const dayCells = document.querySelectorAll('.calendar-grid .day');
    const dayCell = Array.from(dayCells).find(cell => parseInt(cell.textContent) === eventDay);

    if (dayCell) {
        dayCell.classList.add('event-day');

        // Add event to eventsByDate if it doesn't exist
        if (!eventsByDate[eventDay]) {
            eventsByDate[eventDay] = [];
        }
        eventsByDate[eventDay].push(event);

        dayCell.addEventListener('click', () => showEventDetails(eventsByDate[eventDay]));
    } else {
        console.error(`Error: Unable to find day cell for date ${event.dateVenue}`);
    }
}

// Export the function to allow form.js to add new events dynamically
export { addEventToCalendar };
