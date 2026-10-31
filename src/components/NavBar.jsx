import { NavLink } from "react-router-dom";

const links = [
    { label: "Home", to: "/" },
    { label: "Discover", to: "/discover" },
    { label: "About", to: null },       
    { label: "My Profile", to: null },  
];

function NavBar({ isLoggedIn, onToggleLogin }) {
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
            <button className="btn-primary navbar-login" onClick={onToggleLogin}>
                {isLoggedIn ? "Log out" : "Log in"}
            </button>
        </header>
    );
}

export default NavBar;