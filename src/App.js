import React from "react";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import SingleScene from "./components/SingleScene";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBev8b-LDPzooFFokHA_5skUILARRz1WEE",
//   authDomain: "rehearsal-de93d.firebaseapp.com",
//   projectId: "rehearsal-de93d",
//   storageBucket: "rehearsal-de93d.appspot.com",
//   messagingSenderId: "69397025105",
//   appId: "1:69397025105:web:1ca69760f5b27b29f08370"
// };

// const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singlescene" element={<SingleScene />} />
      </Routes>
    </Router>
  );
}

export default App;
