import React, { useState, useEffect } from "react";
import { user, db, auth } from "../firebase";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const RunLines = () => {
  const { sceneId, scriptId } = useParams();
  const usersCollectionRef = collection(db, "users");

  const [scene, setScene] = useState([]);
  const [myLineCounter, setMyLineCounter] = useState(1);
  const [theirLineCounter, setTheirLineCounter] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [myLine, setMyLine] = useState("");
  const [theirLine, setTheirLine] = useState(
    "Click next line to begin scene..."
  );
  const [counter, setCounter] = useState(0);

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
      setScene(currentUser[0].scripts[scriptId].scenes[sceneId]);
    };
    getUsers();
  }, [user, sceneId, scriptId]);

  let nextLines = () => {
    if (myLineCounter >= scene.length - 1) {
      setMyLineCounter(1);
      setTheirLineCounter(0);
      setMyLine(scene[myLineCounter]);
      setTheirLine(scene[theirLineCounter]);
      setCounter(counter + 1);
    } else {
      setMyLineCounter(myLineCounter + 2);
      setTheirLineCounter(theirLineCounter + 2);
      setMyLine(scene[myLineCounter]);
      setTheirLine(scene[theirLineCounter]);
    }
  };

  return (
    <div className="rehearse">
      <div className="run-lines">
        <div className="line" key={Math.random()}>
          <p className="line-text">{theirLine}</p>
        </div>
        {reveal === false ? (
          <div className="my-line">
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
          <div className="my-line" key={Math.random()}>
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
      <div className="run-lines-info">
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
