import  { useContext } from 'react';
import './Landing.css';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Landing() {
  const { user } = useContext(UserContext);

  return (
    <>
      <main>
        {!user ? (
          <>
            <h1 className="zoomIn"> STACKED </h1>
            <p>The Developer Social Network</p>
            <div className="button-container">
              <Link to="/sign-in" className="Login">Sign-in</Link>
              <Link to="/sign-up" className="Register">Register</Link>
            </div>
          </>
        ) : (
          <>
            <Dashboard />
          </>
        )}
      </main>
    </>
  );
}

export default Landing;

