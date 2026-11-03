import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import CreateProfile from "./pages/CreateProfile";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  function handleToggleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  function handleUpdateProfile(changes) {
    setMyProfile((current) => ({ ...current, ...changes }));
  }

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} onToggleLogin={handleToggleLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover isLoggedIn={isLoggedIn} />} />
        <Route path="/create-profile" element={<CreateProfile onSaveProfile={setMyProfile} />} />
        <Route path="/profile" element={<MyProfile profile={myProfile} onUpdateProfile={handleUpdateProfile} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;