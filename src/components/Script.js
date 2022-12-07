import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { user } from "../firebase";

const Script = () => {
  const { scriptId } = useParams();
  const navigate = useNavigate()
  console.log(scriptId);
  console.log(user.scripts[scriptId]);
  const script = user.scripts[scriptId];
  return (
    <div className="script-and-scenes">
      <div className="script">
        <div className="circle"></div>
        <h3>{script.title}</h3>
        <p>Role: {script.role}</p>

        <button id="rehearse-button">Read Scene</button>
        <button id="rehearse-button">Build New Scene</button>
      </div>
      <div className="scenes">
        {Array.isArray(script.scenes)? script.scenes.map((currentScene, index) => {
          return (
            <div className="scene" id = {index}>
              <div className="circle"></div>Scene {index + 1}
              <button id="rehearse-button" onClick={()=>{
                navigate(`/script/${scriptId}/scene/${index}`)
              }}>Run Lines</button>
            </div>
          );
        }):<div>Click Build New Scene to get started</div>}
      </div>
    </div>
  );
};

export default Script;
