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

function setupTimeBlocks() {

    var hourNow = moment().format("HH");
    //var hourNow = 18; for testing
    console.log("Hour now:"+  hourNow);

    /* for 9am to 5pm */
    for (var i= 9; i <= 17; i++) {
        divEl = $('<div>');
        divEl.addClass("row");

        spanEl = $('<span>');
        spanEl.addClass("hour col-1 col-sm-1 col-md-1 col-lg-1");
        if ( i < 12) {
            spanEl.text(i + "AM");
        } else if (i == 12) {
            spanEl.text(i + "PM");
        } else if ( i > 12) {
         spanEl.text(i-12 + "PM");
        }
        divEl.append(spanEl);

        appointmentEl = $('<textarea>');
        appointmentEl.addClass("col-10 col-sm-10 col-md-10 col-lg-10");
        if (i < hourNow) {
            appointmentEl.addClass("past");
        } else if (i == hourNow) {
            appointmentEl.addClass("present");
        } else if (i > hourNow) {
            appointmentEl.addClass("future");
        }
        divEl.append(appointmentEl);

        saveBtnEl = $('<button>');
        saveBtnEl.addClass("saveBtn col-1 col-sm-1 col-md-1 col-lg-1");
    
        iconEl = $('<i class="material-symbols-rounded">Save</i>');
        saveBtnEl.append(iconEl);
        divEl.append(saveBtnEl);

        calendarEl.append(divEl);
    }
}
function showCalendar() {
    console.log("on load");
    var dateStr = momentObj.format('dddd, MMMM Do');
    currentDayEl.text(dateStr);

    setupTimeBlocks();

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