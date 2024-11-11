// event.js

function showEventDetails(event) {
    const eventDetailSection = document.getElementById('event-detail');
    const eventInfo = document.getElementById('event-info');
    const closeButton = document.getElementById('close-detail');

    // Populate event details with conditional checks for each field
    eventInfo.innerHTML = `
        <h2>Event Details</h2>
        <p><strong>Date:</strong> ${event.dateVenue || "N/A"}</p>
        <p><strong>Time:</strong> ${event.timeVenueUTC || "N/A"}</p>
        <p><strong>Home Team:</strong> ${event.homeTeam?.name || "TBD"}</p>
        <p><strong>Away Team:</strong> ${event.awayTeam?.name || "TBD"}</p>
        <p><strong>Stage:</strong> ${event.stage?.name || "N/A"}</p>
        <p><strong>Competition:</strong> ${event.originCompetitionName || "N/A"}</p>
    `;

    // Show the event detail section
    eventDetailSection.style.display = 'block';

    // Smooth scroll to the Event Details section
    eventDetailSection.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    // Add click event to the Close button only if it hasn’t been added yet
    if (closeButton && !closeButton.hasAttribute('data-listener')) {
        closeButton.addEventListener('click', () => {
            eventDetailSection.style.display = 'none';
            document.getElementById('calendar').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        closeButton.setAttribute('data-listener', 'true'); // Mark that listener has been added
    }
}

export { showEventDetails };
