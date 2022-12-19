import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, user, db, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore/lite";

const BuildScene = () => {
  const { scriptId } = useParams();
  const navigate = useNavigate()
  console.log(user.scripts[scriptId]);
  const [lines, setLines] = useState([]);
  const [myLine, setMyLine] = useState("");
  const [theirLine, setTheirLine] = useState("");
  const [currentUser, setCurrentUser] = useState(user);
  const [currentScenesObject, setCurrentScenesObject] = useState(
    user.scripts[scriptId].scenes
  );
  console.log(currentUser.scripts[scriptId].title);
  // console.log(currentScenesObject)

  const currentUserScenes = user.scripts[scriptId].scenes;
  const currentUserScripts = user.scripts;
  console.log("current user scenes", currentUserScenes);
  console.log("current user scripts", currentUserScripts);

  const submitLines = (event) => {
    event.preventDefault();
    setLines([...lines, theirLine, myLine]);
    setMyLine("");
    setTheirLine("");
    getUser();
  };

  const saveScript = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: user.email,
      scripts: currentUserScripts
    });
    // await setCurrentUser({
    //   email: user.email,
    //   scripts: [
    //     { title: currentUser.scripts[scriptId].title, role: currentUser.scripts[scriptId].role, scenes: {} },
    //     ...currentUser.scripts,
    //   ],
    // });
    getUser();
    setLines([]);
  };

  return (
    <div>
      <div className="build-scene-form" onSubmit={submitLines}>
        <div className="build-scene">
          <textarea
            className="line"
            value={theirLine}
            placeholder="their line"
            onChange={(event) => {
              setTheirLine(event.target.value);
            }}
          ></textarea>
          <textarea
            className="line"
            value={myLine}
            placeholder="your line"
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
            return <div className="single-built-lines">{currentLine}</div>;
          })}
        </div>
      ) : (
        <div >Enter some lines to get going!</div>
      )}
      <button
        onClick={() => {
          let key = Object.keys(currentUserScenes).length;
          currentUserScenes[key] = lines;
          console.log(currentUserScenes);
          currentUserScripts[scriptId].scenes = currentUserScenes;
          console.log("FINAL:", currentUserScripts)
          saveScript()
          // navigate(`/script/${scriptId}`)
        }}
      >
        Save Scene
      </button>
    </div>
  );
};

export default BuildScene;
