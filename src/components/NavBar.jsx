function NavBar({ isLoggedIn, onToggleLogin }) {
    const links = ["Home", "Discover", "About", "My Profile"];

    return (
        <header className="navbar">
            <div className="navbar-logo">dinrs</div>
            <nav className="navbar-links">
                {links.map((link) => (
                    <a key={link} href="#" className={link === "Discover" ? "nav-link active" : "nav-link"}>
                        {link}
                    </a>
                ))}
            </nav>
            <button className="btn-primary navbar-login" onClick={onToggleLogin}>
                {isLoggedIn ? "Log out" : "Log in"}
            </button>
        </header>
    );
}

export default NavBar;