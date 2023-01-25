import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, user, db, auth } from "../firebase";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

const BuildScene = () => {
  const { scriptId } = useParams();
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [myLine, setMyLine] = useState("");
  const [theirLine, setTheirLine] = useState("");
  const [currentScenesObject, setCurrentScenesObject] = useState(
    {}
  );
  const [currentUserScenes, setCurrentUserScenes] = useState({});
  const [currentUserScripts, setCurrentUserScripts] = useState([])


  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const usersArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const currentUser = usersArray.filter((currentUser) => {
        return currentUser.email === auth.currentUser.email;
      });
      
      setCurrentScenesObject(currentUser[0].scripts[scriptId])
      setCurrentUserScenes(currentUser[0].scripts[scriptId].scenes)
      setCurrentUserScripts(currentUser[0].scripts)
    };
    getUsers();
  }, []);

  const submitLines = (event) => {
    event.preventDefault();
    setLines([...lines, theirLine, myLine]);
    setMyLine("");
    setTheirLine("");
  };

  const saveScript = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: user.email,
      scripts: currentUserScripts,
    });
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
          {lines.map((currentLine, index) => {
            return <div className="single-built-lines" key = {index}>{currentLine}</div>;
          })}
        </div>
      ) : (
        <div>Enter some lines to get going!</div>
      )}
      <button
        onClick={() => {
          let key = Object.keys(currentUserScenes).length;
          currentUserScenes[key] = lines;
          currentUserScripts[scriptId].scenes = currentUserScenes;
          saveScript();
          // navigate(`/script/${scriptId}`)
        }}
      >
        Save Scene
      </button>
    </div>
  );
};

export default BuildScene;
