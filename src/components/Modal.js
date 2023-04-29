import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, auth, user, getUser } from "../firebase";
import "./Modal.css";

export default function Modal(props) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");

  const handleScriptAdd = async (event) => {
    event.preventDefault();
    console.log(auth.currentUser.email);
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      scripts: [{ title: title, role: role, scenes: {} }, ...props.scripts],
    });

    props.setScripts([
      { title: title, role: role, scenes: {} },
      ...props.scripts,
    ]);

    setTitle("");
    setRole("");
    getUser();
    toggleModal();
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
            <form className="signInForm" onSubmit={handleScriptAdd}>
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
              <button type="submit" className="close-modal">
                +
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
