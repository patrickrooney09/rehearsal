import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, user } from "../firebase";

const BuildScene = () => {
  const { scriptId } = useParams();
  // console.log(user.scripts[scriptId]);
  const [lines, setLines] = useState([]);
  const [myLine, setMyLine] = useState("");
  const [theirLine, setTheirLine] = useState("");

  const submitLines = (event) => {
    event.preventDefault();
    setLines([...lines, theirLine, myLine]);
    getUser();
  };

  return (
    <div>
      <div className="build-scene-form" onSubmit={submitLines}>
        <div className="build-scene">
          <textarea
            className="line"
            value={theirLine}
            onChange={(event) => {
              setTheirLine(event.target.value);
            }}
          ></textarea>
          <textarea
            className="line"
            value={myLine}
            onChange={(event) => {
              setMyLine(event.target.value);
            }}
          ></textarea>
        </div>
        <button id="build-scene-button" onClick={submitLines}>
          +
        </button>
      </div>
      {lines.length > 0 ? (
        <div className="built-lines">
          {lines.map((currentLine) => {
            return <div className="line">{currentLine}</div>;
          })}
        </div>
      ) : (
        <div className="line">Enter some lines to get going!</div>
      )}
    </div>
  );
};

export default BuildScene;
