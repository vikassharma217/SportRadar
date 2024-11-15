Project Approach

This project is designed to create an interactive sports event calendar that allows users to view, add, and interact with sports events for specific dates. The primary objective is to present event information dynamically, enabling users to easily navigate and access event details for different days and months.

Understanding and Planning

To structure the development process effectively, I employed a Scrum-based approach, dividing the project into manageable sprints. Each sprint is dedicated to implementing and refining specific features, ensuring incremental progress with thorough testing at each stage. This approach promotes flexibility and allows room for continuous improvements, enabling us to address and resolve issues in a timely manner.

The Scrum methodology encourages iterative development, with each sprint building on the foundation laid by the previous ones. This sprint-based approach also facilitates consistent documentation, creating a comprehensive record of the project’s evolution. By focusing on a single feature set per sprint, we can maintain a clear trajectory, from the initial setup to implementing advanced features like filters and animations.

Overall Plan:

The project is structured in the following sprints, with each sprint representing a critical stage in the development cycle:

    Sprint 1: Set up the project structure and placeholders in HTML for the calendar, navigation, and event detail views.
    Sprint 2: Build a static calendar view, displaying the days of the current month in a grid format.
    Sprint 3: Integrate the provided JSON data to populate the calendar with event markers.
    Sprint 4: Implement a detail view for events, accessible by clicking on event markers in the calendar.
    Sprint 5: Create a form allowing users to add new events dynamically.
    Sprint 6: Ensure responsive design, adapting layouts for mobile, tablet, and desktop views.
    Sprint 7: Add optional features like filters, animations, and local storage for session persistence and testing.

Each sprint includes a checklist for tracking progress, with documentation of challenges and solutions to support learning and interview preparation.


----------------------------------------------------------------------------------------------------------------------------------------------------------

Sprint 1: Project Setup and Skeleton Structure

Objective: Establish the initial file structure and basic HTML layout for the project, providing a skeleton for the calendar, event details, and navigation bar. This will set the foundation for future sprints by organizing the code and files effectively.
Tasks:

    Create Project Structure:
        Set up folders and files as per the planned structure:
            index.html, styles/styles.css, scripts/main.js, scripts/calendar.js, scripts/events.js, scripts/form.js, data/sportData.json, README.md, and approach.md.

    Initialize HTML Structure in index.html:
        Add placeholders for:
            Calendar Section: Div to hold the monthly calendar grid.
            Event Detail Section: Placeholder for the event details page.
            Navigation Bar: Simple nav bar with links (initially inactive) for Calendar and Add Event pages.

    Basic CSS Setup:
        In styles.css, add simple styling to differentiate sections visually.
        Set up basic grid layout for the calendar section (placeholder).

    Push to GitHub:
        Commit the initial project setup and structure.
        Ensure the repository is private for now.

    Document Progress:
        Update README.md with a brief note on the initial setup.
        Document the completion of each task in this sprint backlog in approach.md.


--------------------------------------------------------------------------------------------------------------------------------------------


Sprint 2: Static Calendar View (Grid for Days)

Objective: Create a monthly calendar view that displays the days of the current month in a grid format. This view will serve as the foundation for adding events and interactions in later sprints.
Tasks:

    Calculate Days in the Current Month:
        Write JavaScript logic to determine:
            The number of days in the current month.
            The day of the week on which the month starts (to align days correctly on the grid).

    Dynamically Generate the Calendar Grid:
        Using calendar.js, dynamically create a grid for the current month.
        Add empty cells at the beginning to align the first day of the month with the correct weekday.
        Add cells for each day of the month, with each cell labeled with its corresponding day number.
        ADD ON: weekdays and current date feature added

    Add Basic Styling for the Calendar:
        Update styles.css to give the calendar a clean and organized look.
        Style the .calendar-grid as a 7-column grid (one column for each day of the week).
        Style the day cells to display day numbers clearly, with background colors and borders for better visibility.

    Verify Calendar Layout:
        Test the calendar in the browser to ensure:
            Days are correctly aligned to the first day of the current month.
            Each day displays properly in its cell.
            The overall structure resembles a calendar grid.

    Document Progress:
        In the README.md file, add a note about the completion of the static calendar view.
        In approach.md, document any challenges encountered in generating the calendar dynamically, as well as solutions applied.

    Commit and Push:
        Commit changes to GitHub with a clear message indicating the addition of the dynamic calendar grid.

Expected Outcome:

By the end of Sprint 2, we should have a visually structured calendar grid that displays the current month. This will provide a base for adding event data in Sprint 3.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 Sprint 3: Integrate the provided JSON data to populate the calendar with event markers.

 NOTE: I have updated the provided json file and added 2 sample events from subject for cuurent month to popullate them on calendar.

TASK:
    Fetch JSON data;
        Implement a function in calendar.js to load the JSON data of sports event.
        Implement the parsing logic to parse the JSON data to access each event.

    Filter event by date (check for current month and year)
        IDentify the current month and year dynamically using JS.
        Filter the event for JSON data to include cuurent months event.

    Mark Event day on Calendar:
        Fot each day cell in calendar grid, check if an event is scheduled on that fate.
        Apply a unique style for event day.
        Set up placeholder for click event day to handle event detail page

    Verfiy event marker
        Test the calendar to ensure that evenet day are correctly marked
    
    Documentation
        update the README.md and approach.md with appropriate action and push to updated


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Sprint 4: Implement a detail view for events, accessible by clicking on event markers in the calendar.

TASK:
    Set up Click listner for Event Days
        - Add JS event listner to detect clicks on highlighted event days.

    Load Event Detail on Click
        - on click , fetch the corresponding details from JSON data and prepare it for display.
        - Populate the EVENT DETAIL section with all availabel information (date, time etc.)

    Smooth Scroll to Event Details section
        - implement a smoothe scroll effect to bring the EVENT DETAIL section into centre view
        
    Add close button:
        - add close button withing th EVENT DETAIL section to , close the event detail TAB and bring user back to calendar grid
    Documentation , Testing and push
        - update documnetation , test updated features and push the code to github.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Sprint 5: Create a form allowing users to add new events dynamically.

TASK:
    Create ADD Event form
        - Design a form in HTML within add event section
        - Include reuired input fileds (refer JSON file for example)
        - add submiit button for form
    
    Form Validation
        - Implememt basic validation to ensure all fileds are filled out
        - display message if any required field is missing

    Add new event to calendar
        - impelment to view these new event to be added in calender grid 
        - ensure these event are visible in event detail view on clicking the event date
        - integrate with existing showEventDetails fucntion to handle displying dynamice event
    
    Form reset
        - clear form field after the event is succesfull added
        - propmt for event added succesfully
    
    Documentation & Testing
        . test all featured, add required documnetation and push to github

    Additional task done:
        - Added to feature display multiple event on same date.
        - Multiple events displayed in diffrent blocks.
        - Events are sorted and displayed in chronological order.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
 Sprint 6: Ensure responsive design, adapting layouts for mobile, tablet, and desktop views.

 TAKS:
    Define Breakpoints
        - Set breakpoints for mobile (max-width: 600px), tablet (max-width: 900px), and desktop (above 900px).

    Responsive Calendar Grid Layout
        - Adjust font sizes, padding, and layout for mobile and tablet views to ensure the calendar grid displays without overflow.
    
    Responsive Event Details Section
        -Make the event details section adapt to smaller screens by adjusting its width, padding, and font sizes.
        -Ensure the close button remains accessible and easy to use on all screen sizes.
    
    Responsive Navigation
        -Stack navigation links vertically on mobile if needed for better accessibility.

    Test Responsiveness
        -Test the design on different screen sizes (mobile, tablet, desktop) and adjust as needed.

    Document Changes
        -Record changes in approach.md and commit updates with a message like “Added responsive design for calendar and event sections.”


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 Sprint 7: Add optional features like filters, animations, and local storage for session persistence.

Additional feature: 

Add Event Form:
    - truncatinate the team name, sport name to 10 char only, (repalce all char after 9th position with .) 

Event detail:
    - add styling to show the  vs format ( HOMETEAM   vs  AWAYTEAM ) with all other detail below them
    
Homepage:
    - add SportRadar logo in background of calendat grid.


------------------------------------------------------------------------------------------------------------------------------------------------------------

