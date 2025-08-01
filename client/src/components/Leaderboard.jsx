import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaders(data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((entry, idx) => (
          <li key={entry.userId._id || idx}>
            {entry.userId.name} - ${entry.totalDonations}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;