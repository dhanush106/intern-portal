import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDashboard, addDonation } from '../services/api';
import DonationChart from './DonationChart';

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId || userId === 'undefined') {
      navigate('/'); // or show an error
      return;
    }
    const fetchUser = async () => {
      try {
        const userData = await getUserDashboard(userId);
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      const amount = parseFloat(donationAmount);
      if (isNaN(amount) || amount <= 0) {
        setMessage('Please enter a valid donation amount');
        return;
      }
      
      const { user: updatedUser, rewards } = await addDonation(userId, amount);
      setUser(updatedUser);
      setDonationAmount('');
      
      if (rewards.length > 0) {
        setMessage(`Congratulations! You unlocked: ${rewards.join(', ')}`);
      } else {
        setMessage(`Successfully donated $${amount.toFixed(2)}`);
      }
      
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage('Donation failed. Please try again.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Your Referral Code</h3>
          <p className="referral-code">{user.referralCode}</p>
        </div>
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p className="donation-amount">${user.totalDonations.toFixed(2)}</p>
        </div>
      </div>
      
      <DonationChart donations={user.totalDonations} />
      
      <div className="donation-form">
        <h3>Add Donation</h3>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleDonation}>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.01"
            min="0"
          />
          <button type="submit">Submit Donation</button>
        </form>
      </div>
      
      <div className="quick-links">
        <a href={`/rewards/${userId}`} className="link-button">
          View Your Rewards
        </a>
        <a href="/leaderboard" className="link-button">
          View Leaderboard
        </a>
      </div>
    </div>
  );
};

export default Dashboard;