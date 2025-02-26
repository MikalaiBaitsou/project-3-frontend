// Main App component that integrates routing, theme toggling, and posts management.
import { useState, useContext } from 'react';
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
import MyButton from './components/CommonComponents/DynamicButton.jsx';
import usePosts from './hooks/usePosts';

const App = () => {
  // Custom hook to fetch posts and manage errors
  const { posts, setPosts, error } = usePosts();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // Manage dark/light mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create a new post and update state
  async function createPost(postData) {
    try {
      const newPost = await postService.create(postData);
      setPosts(prevPosts => [...prevPosts, { ...newPost, comments: [] }]);
      navigate('/posts');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }

  // Delete a post and update state
  async function deletePost(postId) {
    try {
      await postService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }

  // Add a comment to a post and update state
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
      console.error('Error adding comment:', err);
    }
  }

  // Delete a comment from a post and update state
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
      console.error('Error deleting comment:', err);
    }
  }

  return (
    // Container div applies the theme based on isDarkMode state
    <div className={isDarkMode ? 'dark' : 'light'}>
      {error && <div className="error">Error: {error.message}</div>}
      {user && <NavBar />}
      {/* Toggle dark/light mode */}
      <MyButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {/* Define application routes */}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/posts/new' element={<PostForm createPost={createPost} />} />
        <Route path='/posts' element={<PostList posts={posts} deletePost={deletePost} />} />
        <Route
          path='/posts/:postId'
          element={
            <PostDetail
              posts={posts}
              deletePost={deletePost}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

