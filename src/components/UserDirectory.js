
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import UserDetails from './UserDetails';
import userData from '../data/userlist.json';
function UserDirectory() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPostsData, setUserPostsData] = useState([]);

  const handleUserCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleGoBack = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    // import post data from a JSON file
    fetch('PostList.json')
      .then((response) => response.json())
      .then((postData) => {

        const userCounts = {};

        // Calculate post counts based on user IDs
        postData.forEach((post) => {
          const userId = post.userId;
          if (userCounts[userId]) {
            userCounts[userId]++;
          } else {
            userCounts[userId] = 1;
          }
        });

        // Combine user data with post counts
        const userPostsInfo = userData.map((user) => ({
          ...user,
          postCount: userCounts[user.id] || 0,
        }));

        setUserPostsData(userPostsInfo);
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
      });
  }, []);

  return (
    <div className='directoryBox'>
      <h1>Directory</h1>
      {selectedUser ? (
        <UserDetails user={selectedUser} goBack={handleGoBack} />
      ) : (
        <ul>
          {userPostsData.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserCardClick} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDirectory;
