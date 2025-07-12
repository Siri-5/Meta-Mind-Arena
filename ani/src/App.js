import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
import TimerPage from "./TimerPage";
// import Home from "./Home";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </Router>
  );
}

export default App;