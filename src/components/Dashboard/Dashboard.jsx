// src/components/Dashboard/Dashboard.jsx

import { useEffect, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

import { Link } from 'react-router'



const Dashboard = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {

    // THIS IS AN EXAMPLE OF AN API CALL 
    // AFTER YOU ARE LOGGED IN, PLEASE LOOK AT THE USERSERVICE
    // HEADERS FOR SENDING THE JWT TOKEN OVER


    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user.username]); // this useEffect is running when component loads, or when the value
  // of user changes

  return (
    <main>            
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
      <Link to="/posts/new">Create New Post</Link>
      <br />
      <Link to="/posts">All Posts</Link>
    </main>
    

    
  );
};

export default Dashboard;

