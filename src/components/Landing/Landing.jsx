import './Landing.css';  

function Landing ({ User }) {
  return (
    <main>
      <h1 className="zoomIn"><em> STACKED </em></h1>
      <p>Sign up now, or sign in to see your super secret dashboard!</p>
      <div className="button-container">
        {!User ? (
          <>
            <a href="/sign-in">
              <button className="Login" type="button">Sign-in</button>
            </a>
            <a href="/sign-up">
              <button className="Register" type="button">Register</button>
            </a>
          </>
        ) : (
          // if User exists
          <p>Welcome back!</p>
        )}
      </div>
    </main>
  );
}

export default Landing;

