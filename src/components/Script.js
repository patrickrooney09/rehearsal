import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { user } from "../firebase";

const Script = () => {
  const { scriptId } = useParams();
  const navigate = useNavigate()
  const script = user.scripts[scriptId];
  return (
    <div className="script-and-scenes">
      <div className="script">
        <div className="circle"></div>
        <h3>{script.title}</h3>
        <p>Role: {script.role}</p>

        <button id="rehearse-button">Read Scene</button>
        <button id="rehearse-button" onClick={()=>{
          navigate(`/script/${scriptId}/buildscene`)
        }}>Build New Scene</button>
      </div>
      <div className="scenes">
        {Object.values(script.scenes).map((currentScene, index)=>{
          console.log(currentScene)
          return(<div className="scene" id = {index}>
              <div className="circle"></div>Scene {index + 1}
              <button id="rehearse-button" onClick={()=>{
                navigate(`/script/${scriptId}/scene/${index}`)
              }}>Run Lines</button>
            </div>)
        })}
      </div>
    </div>
  );
};

export default Script;
