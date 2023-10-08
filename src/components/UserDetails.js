import React, { useState, useEffect } from 'react';

function UserDetails({ user, goBack }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch post data from PostList.json
    fetch('PostList.json')
      .then((response) => response.json())
      .then((postData) => {
        // Filter posts based on the user's ID
        const postsForUser = postData.filter((post) => post.userId === user.id);
        setUserPosts(postsForUser);
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
      });
  }, [user.id]);

  return (
    <div className="user-details">
      <button className='btn' onClick={goBack}>Back</button>
      <div className='row'>
        <div className='col-6 col-lg-6'>
          <h2>{user.name}</h2>
          <span>Username: {user.username} | CatchPhrase: {user.company.catchPhrase} </span>
        </div>
        <div className='col-6 col-lg-6'>
          <h2>Address</h2>
          <p> {user.address.street} , {user.address.suite} ,{user.address.city} , {user.address.zipcode} </p>
          <p>Email: {user.email} | Phone: {user.phone}</p>
        </div>
      </div>
      <div>
        <h2 className='text-center my-3'>Posts by {user.name}</h2>
        <div className='row'>
          {userPosts.map((post) => (
            <div key={post.id} className='col-lg-3'>
              <div  className="post">
                <h5>{post.title}</h5>
                <p>{post.body}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default UserDetails;
