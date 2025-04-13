import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneLogin from "./components/PhoneLogin";
import VerifyOtp from "./components/VerifyOtp";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneLogin />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
