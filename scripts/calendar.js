document.addEventListener('DOMContentLoaded', function() {
    // Select necessary elements
    const dayLabelsContainer = document.querySelector('.day-labels'); 
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentDateDisplay = document.getElementById('current-date');
    const eventDetailSection = document.getElementById('event-detail');

    // Check that the calendar grid is found
    if (!calendarGrid) {
        console.error("Error: .calendar-grid element not found");
        return;
    }

    // Display the full current date in the top-right
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentWeekday = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const currentMonthName = currentDate.toLocaleString('en-US', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // month is zero-indexed (0 = Jan)

    // Update the current date display
    currentDateDisplay.textContent = `${currentWeekday}, ${currentMonthName} ${currentDay}, ${currentYear}`;

    // Add day-of-week labels to dayLabelsContainer
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayLabels.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.classList.add('day-label');
        dayLabel.textContent = day;
        dayLabelsContainer.appendChild(dayLabel);
    });

    // Calculate the first day of the month & number of days in the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells to align the first day of the month correctly
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        calendarGrid.appendChild(emptyCell);
    }

    // Fetch JSON data and populate the calendar with events
    fetch('../data/sportData.json')
        .then(response => response.json())
        .then(data => {
            const events = data.data;
            const eventDates = events
                .filter(event => {
                    const eventDate = new Date(event.dateVenue);
                    return (
                        eventDate.getFullYear() === currentYear &&
                        eventDate.getMonth() === currentMonth
                    );
                })
                .map(event => ({
                    date: new Date(event.dateVenue).getDate(),
                    details: event
                }));

            // Add numbered cells for each day of the current month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                dayCell.classList.add('day');

                // Highlight the current day
                if (day === currentDay) {
                    dayCell.classList.add('current-day');
                }

                // Check if the day has an event and apply .event-day style
                const event = eventDates.find(e => e.date === day);
                if (event) {
                    dayCell.classList.add('event-day');
                    dayCell.addEventListener('click', () => showEventDetails(event.details));
                }

                calendarGrid.appendChild(dayCell);
            }
        })
        .catch(error => console.error("Failed to load events data:", error));

    // Function to display event details
    function showEventDetails(event) {
        eventDetailSection.innerHTML = `
            <h2>Event Details</h2>
            <p><strong>Date:</strong> ${event.dateVenue}</p>
            <p><strong>Time:</strong> ${event.timeVenueUTC}</p>
            <p><strong>Home Team:</strong> ${event.homeTeam ? event.homeTeam.name : "TBD"}</p>
            <p><strong>Away Team:</strong> ${event.awayTeam ? event.awayTeam.name : "TBD"}</p>
            <p><strong>Stage:</strong> ${event.stage.name}</p>
            <p><strong>Competition:</strong> ${event.originCompetitionName}</p>
        `;
    }
});
