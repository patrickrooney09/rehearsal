import React, { useEffect, useState } from "react";
import { getUser, user, auth } from "../firebase";

const Home = () => {
  getUser();

  const [scripts, setScripts] = useState(user?.scripts);

  useEffect(() => {
    getUser();
    console.log("USER IN HOME:", user);
    console.log(auth.currentUser)
  }, [scripts]);
  console.log('hello')
  return (
    <div className="home">
      <p>Your Scripts</p>
      <p>
        “You just gotta keep sayin` it and sayin` it and sayin` it and sayin` it
        and sayin` it”- Pulp Fiction
      </p>
      <div className = "allScripts">      {scripts ? (
        scripts.map((currentScript) => {
          return (
            <div className="script">
              <div className = 'circle'></div>
              <h3>{currentScript.title}</h3>
              <p>Role: {currentScript.role}</p>
              {/* {placeholder} */}
              <p>Scene 1</p>
              <p>Scene 2</p>
              <p>Scene 3</p>
              {/* {placeholder} */}
              <button id = "rehearse-button">Rehearse</button>
            </div>
          );
        })
      ) : (
        <div className="script">
              <div className = 'circle'></div>
              <h3>Waiting for Godot</h3>
              <p>Role: Estragon</p>
              {/* {placeholder} */}
              <p>Scene 1</p>
              <p>Scene 2</p>
              <p>Scene 3</p>
              {/* {placeholder} */}
              <button id = "rehearse-button">Rehearse</button>
            </div>



      )}</div>

      <button id = "add-new-script">Add New Script</button>
    </div>
  );
};

export default Home;
