import React from "react";
import "./App.css";
import Navbar from "./components/header-footer/Navbar";
import Footer from "./components/header-footer/Footer";
import HomePage from "./components/homepage/HomePage";

function App() {
  return (
    <div className="App container">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
