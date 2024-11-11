// form.js

import { addEventToCalendar } from './calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const formFeedback = document.getElementById('form-feedback');

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Capture form data
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const sport = document.getElementById('sport').value;
        const homeTeam = document.getElementById('home-team').value;
        const awayTeam = document.getElementById('away-team').value;

        // Validate form fields
        if (!eventDate || !eventTime || !sport || !homeTeam || !awayTeam) {
            formFeedback.textContent = "Please fill in all fields.";
            formFeedback.style.display = 'block';
            return;
        }

        formFeedback.style.display = 'none';

        // Create a new event object
        const newEvent = {
            dateVenue: eventDate,
            timeVenueUTC: eventTime,
            homeTeam: { name: homeTeam },
            awayTeam: { name: awayTeam },
            sport: sport,
        };

        // Add the new event to the calendar view
        addEventToCalendar(newEvent);

        // Clear form fields and show feedback
        eventForm.reset();
        formFeedback.textContent = "Event added successfully!";
        formFeedback.style.display = 'block';
    });
});
