import axios from 'axios';
import { useState, useEffect } from 'react';

export const useCommits = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      //Calling GitHub api to get data about commits
      const response = await axios.get(`https://api.github.com/repos/lufilipovic/react-calendar-app/commits?sha=refactoring-code`);
      setCommits(response.data.map((commit) => ({
        title: commit.commit.message,
        name: commit.commit.committer.name,
        start: new Date(commit.commit.committer.date),
        end: new Date(commit.commit.committer.date),
        email: commit.commit.committer.email
      })));
    };

    fetchCommits();
  }, []);

  return commits;
};