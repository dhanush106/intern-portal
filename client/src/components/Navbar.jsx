import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const validUserId = userId && userId !== 'undefined';

  return (
    <nav className="navbar">
      <div className="navbar-brand">Intern Portal</div>
      <div className="navbar-links">
        {validUserId && (
          <>
            <Link to={`/dashboard/${userId}`}>Dashboard</Link>
            <Link to={`/rewards/${userId}`}>Rewards</Link>
          </>
        )}
        <Link to="/leaderboard">Leaderboard</Link>
        {!validUserId && location.pathname !== '/signup' && (
          <Link to="/signup">Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;