import React, { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Impact from "./pages/Impact";
import YourVerse from "./pages/YourVerse";
import Read from "./pages/Read";
import Write from "./pages/Write";
import Login from "./pages/Login";
import MyPersonalVerses from "./pages/MyPersonalVerses";
import API_BASE_URL from "./config";   // ✅ import the base URL

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setValid(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/verify-token`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.valid) {
          setValid(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUserId");
          setValid(false);
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUserId");
        setValid(false);
      }
    };
    verifyToken();
  }, [token]);

  if (valid === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <Spinner size="xl" color="#a47148" />
      </Box>
    );
  }

  return valid ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Box className="shared-bg" minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/yourverse" element={<YourVerse />} />
          <Route path="/read" element={<Read />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected routes */}
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <Write />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <MyPersonalVerses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;