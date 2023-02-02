import axios from 'axios';
import { useState, useEffect } from 'react';

export const useCommits = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios.get(`https://api.github.com/repos/lufilipovic/react-calendar-app/commits`)
      .then(response => {
        setCommits(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return commits;
};