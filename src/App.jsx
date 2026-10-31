import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleToggleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} onToggleLogin={handleToggleLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App
