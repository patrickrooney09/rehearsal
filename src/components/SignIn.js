import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, getUser } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";


const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (event) => {  
    event.preventDefault()
    const auth = getAuth()
    console.log(auth)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then(() => {
        navigate("/home");
        setEmail("");
        setPassword("");
      })
      .then(() => {
        return getUser();
      })
      .catch((error) => {
        console.log("ENTIRE ERROR", error.message);

        if (error.message.includes("user-not-found")) {
          alert("User Not Found", "Please sign up.");
        } else if (error.message.includes("invalid-email")) {
          alert("Invalid Email", "Try again.");
        } else if (error.message.includes("wrong-password")) {
          alert("Wrong Password", "Try again.");
        } else if (error.message.includes("network-request-failed")) {
          alert(
            "Network error",
            "Try again later or check your internet connection."
          );
        } else {
          alert("Unknown Error", "Try again later.");
        }
      });
  };

  const handleSubmit =  (event) => {
    event.preventDefault();

    let user;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
      })
      .then(()=>{
        setDoc(doc(db, 'users', user.uid),{
          email: user.email,
          scripts:[{
            lines: ["Nothing to be done", "I'm beginning to come around to that opinion. All my life I've tried to put it from me, saying, Vladimir, be reasonable, you haven't yet tried everything. And I resumed to struggle. So there you are again."],
            role: "Vladimir",
            title: "Waiting for Godot"
          }]
        })
      })
      .then(()=>{
        navigate("/home");
        setEmail("");
        setPassword("")
      })
      .then(() => {
        return getUser();
      })
      .catch((error) => {
        if (error.message.includes("email-already-in-use")) {
          console.log("ENTIRE ERROR", error.message);
          alert("This email already exists", "Please use another email.");
        } else if (error.message.includes("network-request-failed")) {
          alert(
            "Network error",
            "Try again later or check your internet connection."
          );
        } else {
          alert("Unknown Error", "Try again later.");
        }
      });
  };

  return (
    <div className="signIn">
      <h1>REHEARSE</h1>
      <form className="signInForm" onSubmit= {handleLogin}>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button>Sign In</button>

        {/* <button>Create Account</button> */}
      </form>
      <button onClick={handleSubmit}>Create Account</button>

      <div className="sondheim-quote">
        <p>
          “All the best performers bring to their role something more, something
          different than what the author put on paper. That's what makes theatre
          live. That's why it persists.”
        </p>
        <p>Stephen Sondheim</p>
      </div>
    </div>
  );
};

export default SignIn;
