import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/query' element={<Search />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
