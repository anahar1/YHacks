import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ReviewResume from "./Pages/ReviewResume"; // Import the new component
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Register from "./Pages/Register";
import Reset from "./Pages/Reset";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile"; // New import
import Jobs from "./Pages/Jobs"; // New import
import ConnectWithCL from "./Pages/ConnectWithCL"; // New import
import Inbox from "./Pages/Inbox"; // New import

import Navigation from "./Components/nav/navigation";

function App() {
  return (
    <Router>
      <div
        className="flex flex-col justify-between bg-base-100"
        data-theme="dark"
      >
        <Navigation />
        <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/review-resume" element={<ReviewResume />} /> {/* New route */}
          <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> {/* New route */}
            <Route path="/jobs" element={<Jobs />} /> {/* New route */}
            <Route path="/connect-with-cl" element={<ConnectWithCL />} /> {/* New route */}
            <Route path="/inbox" element={<Inbox />} /> {/* New route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
