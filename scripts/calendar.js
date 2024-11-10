document.addEventListener('DOMContentLoaded', function()  {

// get the calender grid element from _HMTL 
const calendarGrid = document.querySelector('.calendar-grid');

// ensure the calender grdi element found
if (!calendarGrid) {
    console.error("Error: . calendar-grid element not found");
    return;
}

// get the current data details
const  currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth  = currentDate.getMonth(); // month indexed start with zero (0 = Jan)

// calculate the first day of the month & num of days in the month
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // zero indexed
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // last day of month gives totatl days

// for testinf purpose only
//console.log("First day of the month:", firstDayOfMonth);
//console.log("Total days in the month:", daysInMonth);

// Add empty cells to align the first day of the month correctly
for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty'); // Assigns an 'empty' class for styling if needed
    calendarGrid.appendChild(emptyCell);
}

// add numberd cells for each day of the current month
for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div'); // create a div for each day
    dayCell.textContent = day;  // add the day number as the cell content
    dayCell.classList.add('day'); // assigns a 'day class for styling
    calendarGrid.appendChild(dayCell);
    }
});