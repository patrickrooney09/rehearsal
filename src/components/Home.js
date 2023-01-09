import React, { useEffect, useState } from "react";
import {  user, auth, db } from "../firebase";
import {  onAuthStateChanged } from "firebase/auth";
import {  getDoc, doc } from "firebase/firestore/lite";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(user);
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      if (user) {
        getUser()
      } else {
        // No user is signed in.
      }
    });
    let user;
    const getUser = async () => {
      if (auth.currentUser) {
        const docRef = await doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          user = { ...docSnap.data(), id: docSnap.id };
          return setScripts(user.scripts)
        } else {
          console.log("No such document!");
        }
      }else{
        console.log("new get user function not working")
      }
    };
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
