import './App.css';
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from './Request'

function App() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios.get(`repos/lufilipovic/react-calendar-app/commits`)
      .then(response => {
        setCommits(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
