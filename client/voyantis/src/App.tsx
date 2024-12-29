import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QueuePage from "./pages/QueuePage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/queue/:queueName" element={<QueuePage />} />
    </Routes>
  </Router>
);

export default App;
