// src/App.jsx
import { useState, useContext, useEffect } from 'react'; // Removed useState since it's not used
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import { UserContext } from './contexts/UserContext';

import PostForm from './components/PostForm/PostForm';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail/PostDetail';
import * as postService from './services/postService'



const App = () => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const showNavBar = location.pathname !== '/';


  useEffect(() => {

    // define and then call the function immediatly
    async function fetchPosts() {
      try {

        const data = await postService.index()
        // check your work before you do anything else!
        console.log(data, ' <- data')
        // every time you update state, go to your 
        // dev tools and look at it!
        setPosts(data)
      } catch (err) {
        console.log(err)
      }
    }

    // calling the function
    fetchPosts()

  }, []);


  
  // use case: We want all of the posts when the page loads

  async function createPost(dataFromTheForm) {
    // lift the dataFromTheForm
    // pass this function to the form component
    // and call it when the user submits the form
    try {
      const newPost = await postService.create(dataFromTheForm)
      console.log(newPost, ' <- this is our newPost')
      setPosts([...posts, newPost])
      navigate('/posts')
    } catch (err) {
      console.log(err)
    }
  }

  async function deletePost(postIdFromPostDetails) {
    try {
      const response = await postService.deletePost(postIdFromPostDetails)

      // one way to handle an error from the response
      if (response.err) {
        // this forces the err to go to the catch block, the arugment to new Error 
        // will be the value of err in the catch block
        throw new Error(response.err)
      }

      // update our state! filter creates a new array
      const filteredPostsArray = posts.filter((post) => {
        return post._id !== postIdFromPostDetails
      })
      // update state with the filtered array
      setPosts(filteredPostsArray) // remove from the post array
    } catch (err) {
      console.log(err)
    }
  }


  
  
  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />        
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/posts/new' element={<PostForm createPost={createPost} />} />       
        <Route path='/posts' element={<PostList  posts={posts} />} />
        <Route path='/posts/:postId' element={<PostDetail deletePost={deletePost} posts={posts}/>} />
       
      </Routes>
      
      
     
    </>
  );
};
  
export default App;

// comment
// new commet