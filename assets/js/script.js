rootEl = $('header');
currentDayEl = $('#currentDay');
calendarEl = $('.container');

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
            spanEl.text(i + " AM");
        } else if (i == 12) {
            spanEl.text(i + " PM");
        } else if ( i > 12) {
         spanEl.text(i-12 + " PM");
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

    /* show stored appointments */
    /* - retrieve from local storage */
    /* - read into the schedule array */
    /* - write to the <span> and <textarea> for each obj */
    var tempSchedule = JSON.parse(localStorage.getItem("appointments"));
    if (tempSchedule) {
        scheduleForToday = tempSchedule;

        for (var i = 0; i < scheduleForToday.length; i++) {
            var apptObj = scheduleForToday[i];
            console.log("Appt time: " + apptObj.time);
            console.log("Appt details: " + apptObj.appointment);

            var tempDiv = calendarEl.children().eq(i);
            console.log(tempDiv.children().eq(0));
            console.log(tempDiv.children().eq(1));

            tempDiv.children(0).eq(0).text(apptObj.time); // span element
            tempDiv.children(1).eq(1).val(apptObj.appointment); // textarea element
            console.log(tempDiv.children().eq(0));
            console.log(tempDiv.children().eq(1));
        }
     } 

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



function handleSaveAppointment(event) {
    console.log("handleSaveAppointment: " + $(event.target));

    /* get the span text - time */
    /* get the textarea contents - appointment */
    /* store to appointmentObj */
    var timeElement = $(event.target).siblings("span");
    var apptEl = $(event.target).siblings("textarea");
    appointmentObj.time = timeElement.text();
    appointmentObj.appointment = apptEl.val();

    /* check if appointment is in the past */
    hourNow = moment().format("HH");
    console.log("hourNow: " + hourNow);

    console.log("appointmentObj.time:" + appointmentObj.time);
    var timeRequested = appointmentObj.time.split(" ");
    console.log("timeRequested:" + timeRequested[0] + "," + timeRequested[1]);

    var hourRequested;
    if ((timeRequested[0] == 12) && (timeRequested[1] == "PM")) {
        hourRequested = 12;
        console.log("Noon hourRequested: " + hourRequested);
    } else if (timeRequested[1] == "PM") {
        hourRequested = 12 + Number(timeRequested[0]);
        console.log("PM hourRequested: " + hourRequested);
    } else {
        hourRequested = Number(timeRequested[0]);
        console.log("AM hourRequested: " + hourRequested);
    }
    if (hourNow > hourRequested) {
        alert("Unable to make the appointment in the past.");
        apptEl.val(""); // reset that field in the textarea to empty
        return;
    }

    /* get the stored appointments if any */
    var tempSchedule = JSON.parse(localStorage.getItem("appointments"));
    if (tempSchedule == null) {
        /* there are no previous appointments stored */
        scheduleForToday.push(appointmentObj);
        localStorage.setItem("appointments", JSON.stringify(scheduleForToday));
    } else {
        /* there are existing appointments */
        scheduleForToday = tempSchedule;
        /* check for existing appointment before adding this */
        var isExists = false;
        for (var i = 0; i < scheduleForToday.length; i++) {
            if(scheduleForToday[i].time === appointmentObj.time){
                /* overwrite the existing appointment */
                scheduleForToday[i].appointment = appointmentObj.appointment;
                isExists = true;
            }
        }
        /* there is no previous appointment for this time */
        if(!isExists) {
            scheduleForToday.push(appointmentObj);
        }
        localStorage.removeItem("appointments");
        localStorage.setItem("appointments", JSON.stringify(scheduleForToday));
    }

}

/* When this document has loaded, update the date in the header */
/* and show the calendar schedule for today */
$('document').ready(showCalendar);

/* Add event listener for the calendar "container" - event delegation. */
/* On click on a Save button, get the corresponding time and appointment details */
/* and do checks before making the appointment, and saving it to the schedule in local storage */
calendarEl.on('click', "button", handleSaveAppointment);