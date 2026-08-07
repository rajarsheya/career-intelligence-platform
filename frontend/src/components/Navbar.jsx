import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);


function closeMenu() {
    setMenuOpen(false);
}

return (
    <nav className="navbar">
        <div className="navbar-container">

            <Link
                to="/"
                className="navbar-brand"
                onClick={closeMenu}
            >
                <span className="brand-mark">SCI</span>

                <span className="brand-text">
                    <strong>Scholarship & Career</strong>
                    <span>Intelligence Platform</span>
                </span>
            </Link>

            <button
                className="mobile-menu-button"
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span />
                <span />
                <span />
            </button>

            <div
                className={`navbar-links ${
                    menuOpen ? "navbar-links-open" : ""
                }`}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/opportunities"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                >
                    Opportunities
                </NavLink>

                <NavLink
                    to="/recommendations"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                >
                    Recommendations
                </NavLink>

                <NavLink
                    to="/assistant"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                >
                    AI Assistant
                </NavLink>
            </div>

        </div>
    </nav>
);


}

export default Navbar;
