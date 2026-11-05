import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Discover", to: "/discover" },
  { label: "About", to: null },       // page doesn't exist yet
  { label: "My Profile", to: "/profile" },
];

function NavBar({ isLoggedIn, hasProfile, onLogin, onLogout }) {
  const navigate = useNavigate();

  function handleAuthClick() {
    if (isLoggedIn) {
      onLogout();
      navigate("/");
    } else if (hasProfile) {
      onLogin();
      navigate("/profile");
    } else {
      navigate("/create-profile");
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">dinrs</div>
      <nav className="navbar-links">
        {links.map((link) =>
          link.to ? (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ) : (
            <a key={link.label} href="#" className="nav-link">
              {link.label}
            </a>
          )
        )}
      </nav>
      <button className="btn-primary navbar-login" onClick={handleAuthClick}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
    </header>
  );
}

export default NavBar;