import './App.css';
import { useCommits } from './Request';

function App() {
  const commits = useCommits();

  return (
    <div>
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
