import React, { useState, useEffect } from "react";
import { user } from "../firebase";
import { useParams } from "react-router-dom";

const RunLines = () => {
  const { sceneId, scriptId } = useParams();
  let scene = user.scripts[scriptId].scenes[sceneId];
  const lines = Object.values(scene);
  const [myLineCounter, setMyLineCounter] = useState(1);
  const [theirLineCounter, setTheirLineCounter] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [myLine, setMyLine] = useState(lines[0][myLineCounter]);
  const [theirLine, setTheirLine] = useState(lines[0][theirLineCounter]);
  console.log(lines)
  let nextLines = () => {
    setMyLineCounter(myLineCounter + 2);
    setTheirLineCounter(theirLineCounter + 2);
    setMyLine(lines[0][myLineCounter]);
    setTheirLine(lines[0][theirLineCounter]);
    console.log(theirLine);
    console.log(myLine);
  };

  useEffect(() => {
    if (myLineCounter === 1) {
      setMyLineCounter(myLineCounter + 2);
      setTheirLineCounter(theirLineCounter + 2);
      setMyLine(lines[0][myLineCounter]);
      setTheirLine(lines[0][theirLineCounter]);
    }

  }, [myLineCounter, theirLineCounter, myLine, theirLine, lines]);
  return (
    <div className="run-lines">
      {/* {lines[0].map((currentLine) => {
        return <div className="line">{currentLine}</div>;
      })} */}
      <div className="line">{theirLine}</div>
      {reveal === false ? (
        <div className="line">
          <button
            onClick={() => {
              setReveal(true);
            }}
          >
            Reveal
          </button>
        </div>
      ) : (
        <div className="line">
          <p>{myLine}</p>
          <button
            onClick={() => {
              setReveal(false);
            }}
          >
            Hide
          </button>
        </div>
      )}

      <button
        onClick={() => {
          nextLines();
        }}
      >
        Next Line
      </button>
    </div>
  );
};

export default RunLines;
