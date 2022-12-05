import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  

  return (
    <div className="header">
      <h3>REHEARSE</h3>
      <div id="header-link">
        <Link to={`/home`} style={{ textDecoration: "none", color: "black" }}>
          Scripts
        </Link>
      </div>

      <button
        id="logoutButton"
        onClick={() => {
          signOut(auth)
            .then(() => {
              console.log("sign out successful")
              // Sign-out successful.
            })
            .catch((error) => {
              console.log("sign out error")
              // An error happened.
            });
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
