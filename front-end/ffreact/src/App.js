import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AboutUs from "./components/AboutUs";
import GamePage from "./components/GamePage";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function NotFound() {
  return <div>Page Not Found</div>;
}


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
