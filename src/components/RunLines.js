import React, { useState, useEffect } from "react";
import { user } from "../firebase";
import { useParams } from "react-router-dom";

const RunLines = () => {
  const { sceneId, scriptId } = useParams();
  let scene = user.scripts[scriptId].scenes[sceneId];
  const lines = Object.values(scene);
  console.log(scene)

  const [myLineCounter, setMyLineCounter] = useState(1);
  const [theirLineCounter, setTheirLineCounter] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [myLine, setMyLine] = useState(lines[0][myLineCounter]);
  const [theirLine, setTheirLine] = useState(lines[0][theirLineCounter]);
  const [counter, setCounter] = useState(0);

  let nextLines = () => {
    if (myLineCounter >= lines[0].length) {
      setMyLineCounter(1);
      setTheirLineCounter(0);
      setMyLine(lines[0][myLineCounter]);
      setTheirLine(lines[0][theirLineCounter]);
      setCounter(counter + 1);
    } else {
      setMyLineCounter(myLineCounter + 2);
      setTheirLineCounter(theirLineCounter + 2);
      setMyLine(lines[0][myLineCounter]);
      setTheirLine(lines[0][theirLineCounter]);
    }

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
    <div className = "rehearse">
      <div className="run-lines">
        {/* {lines[0].map((currentLine) => {
        return <div className="line">{currentLine}</div>;
      })} */}
        <div className="line" key = {Math.random()}><p className = "line-text">{theirLine}</p></div>
        {reveal === false ? (
          <div className="my-line" >
            <p></p>
            <button
              onClick={() => {
                setReveal(true);
              }}
            >
              Reveal
            </button>
          </div>
        ) : (
          <div className="my-line" key = {Math.random()}>
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
      </div>
      <div className = "run-lines-info">
        <button
          onClick={() => {
            nextLines();
          }}
        >
          Next Line
        </button>
        <p>You've ran this scene {counter} time(s)</p>
      </div>
    </div>
  );
};

export default RunLines;
