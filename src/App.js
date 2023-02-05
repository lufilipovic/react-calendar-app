import './App.css';
import { useCommits } from './Request';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';
import { useState } from 'react';

function App() {
  const commits = useCommits();
  const localizer = momentLocalizer(moment)
  //start from monday
  moment.locale('ko', {
    week: {
      dow: 1,
      doy: 1,
    },
  });

  //show full names of days in the week
  const formats = {
    weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={commits}
        //showing only this month without day week agenda views and buttons
        views={["month"]}
        //show the full name of day of the week
        formats={formats}
        //changes text of buttons for prev and next months
        messages={{
          previous: '<',
          next: '>',
        }}
        onSelectEvent={handleEventClick}
        style={{ height: '38em', margin: "50px" }} />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p>Name: {selectedEvent.name}</p>
            <p>Start time: {moment(selectedEvent.start).format("MMM DD, YYYY HH:mm")}</p>
            <p>Email: {selectedEvent.email}</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;