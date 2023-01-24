import React, { useEffect, useState } from "react";
import {  user, auth, db } from "../firebase";
import {  getDocs, collection } from "firebase/firestore";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(user);
  const [scripts, setScripts] = useState([]);

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
      setCurrentUser(currentUser)
      setScripts(currentUser[0].scripts);
    };
    getUsers();


  },[]);

  return (
    <div className="home">
      <p>Your Scripts</p>
      <p>
        “You just gotta keep sayin` it and sayin` it and sayin` it and sayin` it
        and sayin` it”- Pulp Fiction
      </p>


      <div className="allScripts">
        {" "}
        {scripts ? (
          scripts.map((currentScript, index) => {
            return (
              <div className="script" key={index}>
                <div className="circle"></div>
                <h3>{currentScript.title}</h3>
                <p>Role: {currentScript.role}</p>

                <button
                  id="rehearse-button"
                  onClick={() => {
                    navigate(`/script/${index}`);
                  }}
                >
                  Rehearse
                </button>
              </div>
            );
          })
        ) : (
          <div className="script">Click add scripts to get started</div>
        )}
      </div>
      <Modal currentUser={currentUser} setCurrentUser={setCurrentUser} scripts = {scripts} setScripts = {setScripts} />
    </div>
  );
};

export default Home;
