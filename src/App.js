import './App.css';
import { useCommits } from './Request';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

function App() {
  const commits = useCommits();
  const localizer = momentLocalizer(moment)

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }} />

      {commits.map(commit => (
        <div key={commit.sha}>
          <p>{commit.commit.author.name}</p>
          <p>{commit.commit.message}</p>
          <p>{commit.commit.author.date}</p>
          <p>{commit.commit.author.email}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default App;