/* calendar.js
 This file handles the display and navigation of the calendar, including rendering days,
 highlighting events, and managing month navigation. It also includes the logic for adding 
 new events to the calendar dynamically.*/


let inMemoryEvents = []; // global array to hold all events

import { showEventDetails } from './event.js';

const eventsByDate = {}; // Object to store events by date
let currentDate = new Date(); // Track the selected month and year

// Function to update and display the calendar for the selected month
function updateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentDateDisplay = document.getElementById('current-date');
    calendarGrid.innerHTML = ''; // Clear current calendar
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    currentDateDisplay.textContent = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Adjust day of week to start on Monday
    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for alignment based on the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.classList.add('day');

        // Highlight the current day if it matches today's date
        const isToday = currentYear === new Date().getFullYear() &&
                        currentMonth === new Date().getMonth() &&
                        day === new Date().getDate();
        if (isToday) {
            dayCell.classList.add('current-day');
        }

        // Format date key for events storage and retrieval
        const eventKey = `${currentYear}-${currentMonth + 1}-${day}`;

        // Apply event-day style if events exist for the day
        if (eventsByDate[eventKey]) {
            dayCell.classList.add('event-day');
            dayCell.addEventListener('click', () => showEventDetails(eventsByDate[eventKey]));
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Combine inMemoryEvents with loaded events
function mergeEvents() {
    inMemoryEvents.forEach(event => {
        const eventDate = new Date(event.dateVenue);
        const eventKey = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
        if (!eventsByDate[eventKey]) {
            eventsByDate[eventKey] = [];
        }
        eventsByDate[eventKey].push(event);
    });
}

// Load events from JSON and inMemoryEvents
function loadEvents() {
    fetch('./data/sportData.json')
        .then(response => response.json())
        .then(data => {
            // Clear existing events to reload
            Object.keys(eventsByDate).forEach(key => delete eventsByDate[key]);

            data.data.forEach(event => {
                const eventDate = new Date(event.dateVenue);
                const eventKey = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
                if (!eventsByDate[eventKey]) {
                    eventsByDate[eventKey] = [];
                }
                eventsByDate[eventKey].push(event);
            });

            // Merge dynamically added events
            mergeEvents();
            updateCalendar(); // Refresh calendar after loading events
        })
        .catch(error => console.error("Failed to load events data:", error));
}

document.addEventListener('DOMContentLoaded', function () {
    const dayLabelsContainer = document.querySelector('.day-labels');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    // Set weekday labels to start from Monday
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (dayLabelsContainer) {
        dayLabelsContainer.innerHTML = '';
        dayLabels.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.classList.add('day-label');
            dayLabel.textContent = day;
            dayLabelsContainer.appendChild(dayLabel);
        });
    }

    // Event listeners for navigating months
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadEvents(); // Reload events and refresh calendar for the new month
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadEvents(); // Reload events and refresh calendar for the new month
    });

    // Initialize calendar with the current month and events
    loadEvents();
});

// Function to dynamically add a new event to the calendar
function addEventToCalendar(event) {
    const eventDate = new Date(event.dateVenue);
    const eventKey = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;

    if (!eventsByDate[eventKey]) {
        eventsByDate[eventKey] = [];
    }
    eventsByDate[eventKey].push(event);

    // Add to inMemoryEvents for persistence within session
    inMemoryEvents.push(event);

    // Update the grid styling if the event matches the displayed month and year
    if (eventDate.getFullYear() === currentDate.getFullYear() && eventDate.getMonth() === currentDate.getMonth()) {
        updateCalendar(); // Refresh to display the newly added event
    }
}

export { addEventToCalendar };
