import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";


import AboutUs from "./components/AboutUs";
import GamePage from "./components/GamePage";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";




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
