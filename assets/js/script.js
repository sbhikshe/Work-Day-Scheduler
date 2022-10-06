rootEl = $('header');
currentDayEl = $('#currentDay');
calendarEl = $('.container');

var momentObj = moment();

/* only has appointments for today ? */
/*
var appointmentObj = {
    time: ,
    appointment: 
}
*/

/* list of appointment objects */
var scheduleForToday = [];

function showCalendar() {
    console.log("on load");
    var dateStr = momentObj.format('dddd, MMMM Do');
    currentDayEl.text(dateStr);

    /* show calendar for the day */
    /* - retrieve from local storage */
    /* - read into the schedule array */
    /* - write to the list of forms */

    /* check every hour to update the background colors for the time blocks */
    /* current becomes grey, next becomes red */
    /* setInterval() running every minute / 5 mins ?? */
}

/* add event listener for each save button */
/* on click, save time + appointment to schedule array and local storage? */
/* or save in the schedule, and write to the local storage on closing the app? */
/* On open, update the currentDayEl */


$('document').ready(showCalendar);