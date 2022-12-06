import React from "react";
import {  user} from "../firebase";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Home =  () => {
  const navigate = useNavigate()
  return (
    <div className="home">
      <p>Your Scripts</p>
      <p>
        “You just gotta keep sayin` it and sayin` it and sayin` it and sayin` it
        and sayin` it”- Pulp Fiction
      </p>
      <div className = "allScripts">      {user.scripts ? (
        user.scripts.map((currentScript, index) => {
          return (
            <div className="script" key = {index}>
              <div className = 'circle'></div>
              <h3>{currentScript.title}</h3>
              <p>Role: {currentScript.role}</p>
              {/* {placeholder} */}
              <p>Scene 1</p>
              <p>Scene 2</p>
              <p>Scene 3</p>
              {/* {placeholder} */}
              <button id = "rehearse-button" onClick={()=>{
                navigate(`/script/${index}`)
              }}>Rehearse</button>
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
      <Modal />
    </div>
  );
};

export default Home;
