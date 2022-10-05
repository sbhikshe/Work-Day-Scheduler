rootEl = $('header');
currentDayEl = $('#currentDay');
calendarEl = $('.container');

var momentObj = moment();

function showCalendar() {
    console.log("on load");
    var dateStr = momentObj.format('dddd, MMMM Do');
    currentDayEl.text(dateStr);
}
/* On open, update the currentDayEl */
$('document').ready(showCalendar);