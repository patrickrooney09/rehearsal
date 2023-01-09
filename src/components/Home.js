import React, { useEffect, useState } from "react";
import { getUser, user, auth, db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore/lite";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(user);
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      if (user) {
        // User is signed in.
        console.log(auth.currentUser)
        getUser()
      } else {
        // No user is signed in.
        console.log(user.email)
      }
    });
    let user;
    const getUser = async () => {
      if (auth.currentUser) {
        const docRef = await doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          user = { ...docSnap.data(), id: docSnap.id };
          console.log(user);
          return setScripts(user.scripts)
        } else {
          console.log("No such document!");
        }
      }else{
        await console.log(auth)
      }
    };
    getUser();
    console.log('hello')

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
      <Modal currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default Home;
