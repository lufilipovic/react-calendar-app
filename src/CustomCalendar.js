import { useCommits } from './Request';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';
import React, { useState } from 'react';

function CustomCalendar() {
    const commits = useCommits();
    const localizer = momentLocalizer(moment)
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [setView] = React.useState("month");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    //Using moment.js to start the week from monday
    moment.locale('ko', {
        week: {
            dow: 1,
            doy: 1,
        },
    });

    //Formatting days in the week to show full names
    const formats = {
        weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
    }

    //Showing modal
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    //Closing modal
    const handleModalClose = () => {
        setShowModal(false);
    };

    // Extract the year and month from the URL
    const [year, month, day] = window.location.pathname
        .substr(1)
        .split("-")
        .map(val => parseInt(val, 10));

    // Use the extracted year and month to set the selectedDate
    React.useEffect(() => {
        setSelectedDate(new Date(year, month - 1, day || 1));
    }, [year, month, day]);

    return (
        <div>
            <Calendar
                localizer={localizer}
                //Adding events in the calendar to show commits using GitHub api
                events={commits}
                //Showing only current month
                views={["month"]}
                //Formatter to show full names of days in the week
                formats={formats}
                //Changing the text of buttons to show < and >
                messages={{
                    previous: '<',
                    next: '>',
                }}
                //Adding event on click to show information about events using modal
                onSelectEvent={handleEventClick}
                //Setting the date to selected date
                date={selectedDate}
                //Navigating to selected date
                onNavigate={(date) => setSelectedDate(date)}
                //Changing the view to new view
                onView={(view) => setView(view)}
                style={{ height: '38em', margin: "50px" }} />
            {/* Calling funtion commitDetails that shows modal with about commits */}
            {commitDetails()}
        </div>
    )

    function commitDetails() {
        return showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>{selectedEvent.title}</h2>
                    <p>Name: {selectedEvent.name}</p>
                    <p>Start time: {moment(selectedEvent.start).format("MMM DD, YYYY HH:mm")}</p>
                    <p>Email: {selectedEvent.email}</p>
                    <button onClick={handleModalClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default CustomCalendar
