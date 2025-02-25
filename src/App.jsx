import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import { UserContext } from './contexts/UserContext';
import PostForm from './components/PostForm/PostForm';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail/PostDetail';
import CommentList from './components/CommentList/CommentList';
import CommentForm from './components/CommentForm/CommentForm';
import * as postService from './services/postService';
import * as commentService from './services/commentService';

const App = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postService.index();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  async function createPost(postData) {
    try {
      const newPost = await postService.create(postData);
      setPosts(prevPosts => [...prevPosts, { ...newPost, comments: [] }]);
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(postId) {
    try {
      const response = await postService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      // Optionally, show a message to the user or re-fetch posts
    }
  }
  

  async function addComment(postId, commentData) {
    try {
      const newComment = await commentService.create(postId, commentData);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteComment(postId, commentId) {
    try {
      await commentService.delete(postId, commentId);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
            : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {user ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/posts/new' element={<PostForm createPost={createPost} />} />
        <Route path='/posts' element={<PostList posts={posts} deletePost={deletePost} />} />
        <Route path='/posts/:postId' element={<PostDetail posts={posts} deletePost={deletePost} addComment={addComment} deleteComment={deleteComment} />} />
      </Routes>
    </>
  );
};

export default App;
