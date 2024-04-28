
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import CandyStorage from "./components/CandyStorage";
import SignIn from "./components/SignIn.js";
import Sidebar from "./Ui/Sidebar.js";
import Nav from "./components/Nav.js";
import Inventory from "./components/Inventory.js";

function App() {
  const isSignedIn = (window.localStorage.getItem("signedIn"))

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element= {<SignUp/>}> </Route>
        <Route exact path="/" element= {<SignIn/>}> </Route>
        <Route exact path="/storage" element= {isSignedIn ? <CandyStorage/>: <SignIn/>}> </Route>
        <Route exact path="/inventory" element= {isSignedIn ? <Inventory/>: <SignIn/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
