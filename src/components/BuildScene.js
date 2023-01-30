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
  const [currentScenesObject, setCurrentScenesObject] = useState({});
  const [currentUserScenes, setCurrentUserScenes] = useState({});
  const [currentUserScripts, setCurrentUserScripts] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    console.log(lines);
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const usersArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const currentUser = usersArray.filter((currentUser) => {
        return currentUser.email === auth.currentUser.email;
      });

      setCurrentScenesObject(currentUser[0].scripts[scriptId]);
      setCurrentUserScenes(currentUser[0].scripts[scriptId].scenes);
      setCurrentUserScripts(currentUser[0].scripts);
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
            if (editMode === false) {
              return (
                <div className="single-built-lines" key={index}>
                  {currentLine}
                </div>
              );
            }
            if (editMode === true) {
              console.log("CURRENT LINES:", lines)
              return (
                <textarea
                  key = {index}
                  className="line"
                  value={currentLine}
                  placeholder="their line"
                  onChange={(event) => {
                    const currentLineEdit = lines.filter((c, i)=>{
                      if(index === i){
                        console.log(c, "C")
                         c = event.target.value
                      }else{
                        return c;
                      }
                    })
                    setLines(currentLineEdit)
                  }}
                ></textarea>
              );
            }
          })}
        </div>
      ) : (
        <div className="built-lines">Enter some lines to get going!</div>
      )}
      <button
        className="built-lines"
        onClick={() => {
          let key = Object.keys(currentUserScenes).length;
          currentUserScenes[key] = lines;
          currentUserScripts[scriptId].scenes = currentUserScenes;
          saveScript();
          navigate(`/script/${scriptId}`);
        }}
      >
        Save Scene
      </button>

      {editMode === false ? (
        <button
          className="built-lines"
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </button>
      ) : (
        <button
          className="built-lines"
          onClick={() => {
            setEditMode(false);
          }}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default BuildScene;
