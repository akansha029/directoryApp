import React from 'react';

function UserCard({ user, onClick }) {
  return (
    <div className="user-card">
      <div className='cardDetails'>
      <h2>{user.name}</h2>
      <p>Total Posts: {user.postCount}</p>
      </div>
      <button className='btn' onClick={() => onClick(user)}>View Details</button>
    </div>
  );
}

export default UserCard;
