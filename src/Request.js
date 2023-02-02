//request.js

import axios from 'axios';
import { useState, useEffect } from 'react';

export const useCommits = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      const response = await axios.get(`https://api.github.com/repos/lufilipovic/react-calendar-app/commits?sha=adding-calendar`);
      setCommits(response.data.map((commit) => ({
        title: commit.commit.message,
        start: new Date(commit.commit.committer.date),
        end: new Date(commit.commit.committer.date),
      })));
    };

    fetchCommits();
  }, []);

  return commits;
};