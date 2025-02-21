// src/App.jsx
import { useContext } from 'react'; // Removed useState since it's not used
import { Routes, Route, useLocation } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const showNavBar = location.pathname !== '/';
  
  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};
  
export default App;

// comment