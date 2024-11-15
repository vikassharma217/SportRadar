/* event.js
 This file is responsible for displaying details of selected events on the calendar.
 It defines functions to display event information and manages the user interface for 
 individual event details, including a close button to hide event details when finished. */

function showEventDetails(events) {
    const eventDetailSection = document.getElementById('event-detail');
    const eventInfo = document.getElementById('event-info');
    const closeButton = document.getElementById('close-detail');

    // Clear previous details
    eventInfo.innerHTML = '<h2>Event Details</h2>';
    
    // Ensure events is defined as an array and sort it by time
    if (!events || events.length === 0) {
        console.error("No events found for the selected day.");
        return;
    }
    
    // Sort events in chronological order based on timeVenueUTC
    events.sort((a, b) => (a.timeVenueUTC || "").localeCompare(b.timeVenueUTC || ""));

    // Loop through each event and display its details
    events.forEach((event, index) => {
        const eventContainer = document.createElement('div');
        eventContainer.classList.add('event-container'); // CSS class for styling each event block

        const homeTeamName = event.homeTeam ? event.homeTeam.name : "N/A";
        const awayTeamName = event.awayTeam ? event.awayTeam.name : "N/A";
        const eventDate = event.dateVenue || "Unknown Date";
        const eventTime = event.timeVenueUTC || "Unknown Time";
        const stage = event.stage ? event.stage.name : "Unknown Stage";
        const competition = event.originCompetitionName || "Unknown Competition";

         // Display "VS" format for teams
         const vsHeader = document.createElement('div');
         vsHeader.classList.add('vs-header');
         vsHeader.innerHTML = `<span class="home-team">${homeTeamName}</span> <span class="vs-text">vs</span> <span class="away-team">${awayTeamName}</span>`;
         eventContainer.appendChild(vsHeader);

        // Event detail content
        const eventContent = document.createElement('div');
        eventContent.classList.add('event-content'); // CSS class for event content styling
        eventContent.innerHTML = `
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
            <p><strong>Home Team:</strong> ${homeTeamName}</p>
            <p><strong>Away Team:</strong> ${awayTeamName}</p>
            <p><strong>Stage:</strong> ${stage}</p>
            <p><strong>Competition:</strong> ${competition}</p>
        `;

        eventContainer.appendChild(eventContent);
        eventInfo.appendChild(eventContainer);
    });

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
