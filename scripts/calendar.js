// get the calender grid element from _HMTL 
const calendarGrid = document.querySelector('.calander-grid');

// get the current data details
const  currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth  = currentDate.getMonth(); // month indexed start with zero (0 = Jan)

// calculate the first day of the month & num of days in the month
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // zero indexed
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // last day of month gives totatl days

console.log("First day of the month:", firstDayOfMonth);
console.log("Total days in the month:", daysInMonth);