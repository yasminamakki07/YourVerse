import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Box className="shared-bg" minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/yourverse" element={<YourVerse />} />
          <Route path="/read" element={<Read />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personal" element={<MyPersonalVerses />} /> 
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
