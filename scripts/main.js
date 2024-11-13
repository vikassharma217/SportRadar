document.addEventListener('DOMContentLoaded', () => {
    const calendarSection = document.getElementById('calendar');
    const addEventSection = document.getElementById('add-event');
    const eventDetailSection = document.getElementById('event-detail');

    const calendarTab = document.querySelector('nav ul li a[href="#calendar"]');
    const addEventTab = document.querySelector('nav ul li a[href="#add-event"]');

    // Function to show the Calendar section and hide others
    function showCalendar() {
        calendarSection.style.display = 'block';
        addEventSection.style.display = 'none';
        eventDetailSection.style.display = 'none';
    }

    // Function to show the Add Event section and hide others
    function showAddEvent() {
        calendarSection.style.display = 'none';
        addEventSection.style.display = 'block';
        eventDetailSection.style.display = 'none';
    }

    // Event listeners for the tabs
    calendarTab.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        showCalendar();
    });

    addEventTab.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        showAddEvent();
    });

    // Initially, show the Calendar section and hide others
    showCalendar();
});
