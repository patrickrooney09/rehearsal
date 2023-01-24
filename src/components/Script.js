import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Script = () => {
  const { scriptId } = useParams();
  const id = Number(scriptId);
  const navigate = useNavigate();

  const [script, setScript] = useState({});
  const [scenes, setScenes] = useState({});
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
      setScript(currentUser[0].scripts[id]);
      setScenes(currentUser[0].scripts[id].scenes);
    };
    getUsers();
  }, []);

  return (
    <div className="script-and-scenes">
      <div className="script">
        <div className="circle"></div>
        <h3>{script.title}</h3>
        <p>Role: {script.role}</p>

        <button id="rehearse-button">Read Scene</button>
        <button
          id="rehearse-button"
          onClick={() => {
            navigate(`/script/${scriptId}/buildscene`);
          }}
        >
          Build New Scene
        </button>
      </div>
      <div className="scenes">
        {Object.values(scenes).map((currentScene, index) => {
          return (
            <div className="scene" id={index} key = {index}>
              <div className="circle"></div>Scene {index + 1}
              <button
                id="rehearse-button"
                onClick={() => {
                  navigate(`/script/${scriptId}/scene/${index}`);
                }}
              >
                Run Lines
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Script;
