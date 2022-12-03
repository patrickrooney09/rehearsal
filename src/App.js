import React from "react";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import SingleScene from "./components/SingleScene";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path = "/singlescene" element = {<SingleScene />} />
      </Routes>
    </Router>
  );
}

export default App;
