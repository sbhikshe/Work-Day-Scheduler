rootEl = $('header');
currentDayEl = $('#currentDay');
calendarEl = $('.container');

var momentObj = moment();

/* only has appointments for today ? */

var appointmentObj = {
    time: undefined,
    appointment: undefined
}

/* list of appointment objects */
var scheduleForToday = [];

function setupTimeBlocks() {

    var hourNow = moment().format("HH");
    //var hourNow = Math.floor(Math.random() * 24); for testing
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
    var dateStr = moment().format('dddd, MMMM Do');
    currentDayEl.text(dateStr);

    /* show calendar for the day */
    setupTimeBlocks();

    /* - retrieve from local storage */
    /* - read into the schedule array */
    /* - write to the list of forms */

    /* check every 5 mins to update the background colors for the time blocks */
    /* current becomes grey, next becomes red */
    /*
    var timerId = setInterval(function() {
        //hourNow = moment().format("HH");
        var hourNow = Math.floor(Math.random() * 24);
        console.log("random time: " + hourNow);
        // should we remove what they have currently before adding? 
        for (var i = 9; i <= 17; i++){
            var apptEl = calendarEl.children().children(i-9).eq(1);
            console.log(apptEl);
            apptEl.removeClass("past present future");
            if (i < hourNow) {
                apptEl.addClass("past");
            } else if (i == hourNow) {
                apptEl.addClass("present");
            } else if (i > hourNow) {
                apptEl.addClass("future");
            }        
        }
    },30000);
    */
}

/* add event listener for each save button */
/* on click, save time + appointment to schedule array and local storage? */
/* or save in the schedule, and write to the local storage on closing the app? */
/* On open, update the currentDayEl */

function handleSaveAppointment(event) {
    //event.preventDefault();
    console.log("handleSaveAppointment: " + $(event.target));

    /* get the span text - time */
    /* get the textarea contents - appointment */
    /* store to appointmentObj */
    /* JSON.stringify() and store to localStorage */
    var timeElement = $(event.target).siblings("span");
    console.log(timeElement);
    var apptEl = $(event.target).siblings("textarea");
    console.log(apptEl);
    appointmentObj.time = timeElement.text();
    appointmentObj.appointment = apptEl.val();
    console.log("Time: " + appointmentObj.time);
    console.log("Details: " + appointmentObj.appointment);
    localStorage.setItem("appointments", JSON.stringify(appointmentObj));

}

$('document').ready(showCalendar);
calendarEl.on('click', "button", handleSaveAppointment);