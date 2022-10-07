# Work-Day-Scheduler
## Table of Contents
* [Description](#description)
* [Screenshots](#screenshots)
* [Code Snippets](#code-snippets)
* [Technologies Used](#technologies-used)
* [Credits](#credits)
* [Author Links](#author-links)

***

## Description
This Work Day Scheduler is a simple application that allows the user to enter appointments for the average work day from 9am to 5pm. The application displays the past few hours in grey, the current hour in orange, the remaining hours in the work day in green. The user can enter appointments in the text area and save them to the application's local storage. The appointments will be displayed if the page is refreshed or the application is reopened. The page has been deployed to the Github Pages at [Work Day Scheduler](https://sbhikshe.github.io/Work-Day-Scheduler/)


## Screenshots

### *1. The Wireframe design*
!["Wireframe Design"](./assets/images/WDS%20Wireframe.png)
#### Note: In the implementation, forms and input groups are not used for each time block. Instead a \<span\> for the time, \<textarea\> for the appointment details, and a \<button\> with a Google icon are used.

### *2. The Work Day Scheduler*
!["The Work Day Scheduler"](./assets/images/WDS%20screenshot_1.png)

### *3. Appointments*
!["Enter and showing appointments"](./assets/images/WDS%20Screenshot_2.png)

### *4. Making an appointment in the past.*
!["The user is shown an alert if they try to make to appointment in the past"](./assets/images/WDS%20Screenshot_3.png)

### *5. Save the appointments*
!["The appointments are saved to the application's local storage"](./assets/images/WDS%20Screenshot_4.png)

### *6. Change an appointment.*
!["An existing appointment is overwritten with a new one"](./assets/images/WDS%20Screenshot_5.png)
***



## Code Snippets
#### Note: These snippets contain pseudocode in the form of comments rather than the actual code.

### *1. This function is called when the document is loaded and ready. The function invokes setupTimeBlocks() to create and display the time blocks for each hour. Each time block (for an hour) consists of a span element for the time, a textarea element to enter the appointment and a button to save the appointment. Once the time blocks are set up, this function retrieves any stored appointments from local storage and displays them in the time blocks.*
```
  function showCalendar() {

    /* set today's date on the header */
    var dateStr = moment().format('dddd, MMMM Do');
    currentDayEl.text(dateStr);

    /* show calendar for the day */
    setupTimeBlocks();

    /* show stored appointments */
    /* - retrieve from local storage */
    /* - read into the scheduleForToday array */
    /* - write to the <span> and <textarea> for each obj */
    ...
}

```

### *2. This function is invoked when the Save button is clicked. It captures the time and appointment details entered by the user. A check is done to see if the user is trying to make an appointment in the past. If so, an alert is displayed, and the operation is not allowed. Also, the stored appointments are retrieved from local storage to check if there is a previous appointment for this time block. It is overwritten if one exists. Or if this is a fresh appointment, it is accepted, and all of the appointments are saved to local storage.*
```
  function handleSaveAppointment(event) {

    /* get the span text - time */
    /* get the textarea contents - appointment */
    /* store to appointmentObj */
    ...

    /* check if appointment is in the past */
    hourNow = moment().format("HH");
    var hourRequested = timeStrToNumber(appointmentObj.time);

    if (hourNow > hourRequested) {
        alert("Unable to make an appointment in the past.");
        return;
    }

    /* get the stored appointments if any */
    var tempSchedule = JSON.parse(localStorage.getItem("appointments"));
    if (tempSchedule == null) {
        /* there are no previous appointments stored, add new appointment */
        ...
    } else {
        /* there are existing appointments */
        /* check for existing appointment at the same time before adding this */
        
        /* if there are previous appointments but not for this time block */
        /* add new appointment */
        
        /* remove all the appointments, and write them back with the new one */
        localStorage.removeItem("appointments");
        localStorage.setItem("appointments", JSON.stringify(scheduleForToday));
    }
}

```

***
## Technologies Used
- HTML
- CSS
- JavaScript
- Web APIs
- jQuery
- Bootstrap

## Credits
[jQuery API](https://api.jquery.com/ready/)\
[Bootstrap Grid Layout](https://getbootstrap.com/docs/4.0/layout/grid/)\
[Moment.js](https://momentjs.com/docs/#/parsing/now/)

## Author Links
[LinkedIn](https://www.linkedin.com/in/sripriya-bhikshesvaran-8520992/)\
[Github](https://github.com/sbhikshe)
