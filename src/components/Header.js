import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="header">
      <p>REHEARSE</p>
      <Link to = {`/home`}>Scripts</Link>
      <button id = "logoutButton" onClick = {()=>{
        navigate("/")
      }}>Logout</button>
    </div>
  );
};

export default Header
