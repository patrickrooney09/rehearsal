import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) =>{
    event.preventDefault()
    navigate("/home")
  }
  return (
    <div className = "signIn">
      <h1>REHEARSE</h1>
      <form className = "signInForm" onSubmit = {handleSubmit}>
        <input name="username" placeholder="username"></input>
        <input name="password" placeholder="password"></input>
        <button>Sign In</button>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignIn;
