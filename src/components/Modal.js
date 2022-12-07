import React, { useState } from "react";
import { setDoc, doc, updateDoc } from "firebase/firestore/lite";
import {db, auth, user, getUser} from "../firebase"
import "./Modal.css";
import {  useNavigate } from "react-router-dom";

export default function Modal(props) {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  console.log(props)
  const handleScriptAdd = () => {
    toggleModal()
     updateDoc(doc(db, "users", auth.currentUser.uid), {
      email: user.email,
      scripts: [{title: title, role:role, scenes:{}}]

    });
    props.setCurrentUser(user)
  };


  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Add Script
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>Add Script</p>
            <form className="signInForm" onSubmit= {handleScriptAdd}>
              <input
                name="title"
                placeholder="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
              <input
                type="role"
                name="role"
                placeholder="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              ></input>
              <button className="close-modal" >
                +
              </button>

              {/* <button>Create Account</button> */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
