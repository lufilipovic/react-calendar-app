import './App.css';
import { useCommits } from './Request';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  const commits = useCommits();
  const localizer = momentLocalizer(moment)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={commits}
        startAccessor="start"
        endAccessor="end"

        style={{ height: 500, margin: "50px" }} />
    </div>
  );
}

export default App;