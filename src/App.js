import './App.css';
import { useCommits } from './Request';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

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
        style={{ height: 500, margin: "50px" }} />
    </div>
  );
}

export default App;