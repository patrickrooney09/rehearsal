import React from "react";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Script from "./components/Script";
import SingleScene from "./components/SingleScene";
import RunLines from "./components/RunLines";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singlescene" element={<SingleScene />} />
        <Route path = "/script/:scriptId" element = {<Script />}/>
        <Route path = "/script/:scriptId/scene/:sceneId" element = {<RunLines />} />
      </Routes>
    </Router>
  );
}

export default App;
