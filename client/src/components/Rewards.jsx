import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDashboard } from '../services/api';

const Rewards = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDashboard(userId);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const rewards = [
    { id: 'Bronze', threshold: 100, description: 'Bronze Badge' },
    { id: 'Silver', threshold: 500, description: 'Silver Badge + Certificate' },
    { id: 'Gold', threshold: 1000, description: 'Gold Badge + Swag Pack' },
    { id: 'Platinum', threshold: 5000, description: 'Platinum Badge + Mentorship' }
  ];

  return (
    <div className="rewards">
      <h2>Your Rewards</h2>
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`reward-card ${
              user.rewardsUnlocked.includes(reward.id) ? 'unlocked' : 'locked'
            }`}
          >
            <h3>{reward.id}</h3>
            <p>{reward.description}</p>
            <p>Threshold: ${reward.threshold}</p>
            {user.rewardsUnlocked.includes(reward.id) ? (
              <span className="badge">Unlocked!</span>
            ) : (
              <span className="badge locked">Locked</span>
            )}
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(100, (user.totalDonations / reward.threshold) * 100)}%`
                }}
              />
            </div>
            <p>
              {user.totalDonations >= reward.threshold
                ? 'Goal achieved!'
                : `$${Math.max(0, reward.threshold - user.totalDonations).toFixed(2)} to go`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;