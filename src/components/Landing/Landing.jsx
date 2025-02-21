// src/components/Landing.jsx 
import './Landing.css'  
const Landing = () => {
    return (
      <main>
        <h1><em> STACKED </em></h1>
        <p>Sign up now, or sign in to see your super secret dashboard!</p>
        <a href="/sign-in"><button className="Login" type="button"> Sign-in</button></a>
        <a href="/sign-up"><button className="Register" type="button"> Register</button></a>
      </main>
    );
  };
  
  export default Landing;
  
  