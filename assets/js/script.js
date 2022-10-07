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
    hourNow = 13; // remove
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
            // disable the textarea so that user cannot overwrite past appointments
            appointmentEl.prop('disabled', true); 
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

function timeStrToNumber(timeStr) {
    console.log("timeStr: " + timeStr);

    /* returns hour of the time in 24 hr format */
    var hour;

    var timeArray = timeStr.split(" ");
    console.log("timeArray:" + timeArray[0] + "," + timeArray[1]);

    if ((timeArray[0] == 12) && (timeArray[1] == "PM")) {
        hour = 12;
        console.log("Noon hour: " + hour);
    } else if (timeArray[1] == "PM") {
        hour = 12 + Number(timeArray[0]);
        console.log("PM hour: " + hour);
    } else {
        hour = Number(timeArray[0]);
        console.log("AM hour: " + hour);
    }
    return hour;
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
    var scheduleForToday = JSON.parse(localStorage.getItem("appointments"));
    if (scheduleForToday) {

        for (var i = 0; i < scheduleForToday.length; i++) {
            var apptObj = scheduleForToday[i];
            console.log("Appt time: " + apptObj.time);
            console.log("Appt details: " + apptObj.appointment);

            /* get the index of the div for this appointment */
            /* get the hour, subtract 9 to get this index */
            var hour = timeStrToNumber(apptObj.time);
            var divIndex = hour - 9;
            var tempDiv = calendarEl.children().eq(divIndex);
            console.log(tempDiv.children().eq(0)); // span
            console.log(tempDiv.children().eq(1)); // textarea

            /* set the appointment to the textarea */
            tempDiv.children(1).eq(1).val(apptObj.appointment);
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
    hourNow = 13; // remove
    console.log("hourNow: " + hourNow);

    console.log("appointmentObj.time:" + appointmentObj.time);
    var hourRequested = timeStrToNumber(appointmentObj.time);
    console.log("hourRequested: " + hourRequested);

    if (hourNow > hourRequested) {
        alert("Unable to make an appointment in the past.");
        return;
    }

    /* get the stored appointments if any */
    var tempSchedule = JSON.parse(localStorage.getItem("appointments"));
    if (tempSchedule == null) {
        /* there are no previous appointments stored, add new appointment */
        scheduleForToday.push(appointmentObj);
        localStorage.setItem("appointments", JSON.stringify(scheduleForToday));
    } else {
        /* there are existing appointments */
        scheduleForToday = tempSchedule;
        /* check for existing appointment at the same time before adding this */
        var isExists = false;
        for (var i = 0; i < scheduleForToday.length; i++) {
            if(scheduleForToday[i].time === appointmentObj.time){
                /* overwrite the existing appointment with new appointment */
                scheduleForToday[i].appointment = appointmentObj.appointment;
                isExists = true;
            }
        }
        /* there are previous appointment but not for this time block */
        /* add new appointment */
        if(!isExists) {
            scheduleForToday.push(appointmentObj);
        }
        /* remove all the appointments, and write them back with the new one */
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