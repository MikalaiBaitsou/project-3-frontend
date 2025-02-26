// Custom hook to fetch and manage posts
import { useState, useEffect } from 'react';
import * as postService from '../services/postService';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postService.index();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err);
      }
    }
    fetchPosts();
  }, []); // Sets Empty array for posts 

  return { posts, setPosts, error };
};

export default usePosts;
