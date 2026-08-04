import { Link } from "react-router-dom";


function Navbar() {

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Scholarship & Career
                    Intelligence
                </Link>


                <div className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/opportunities">
                        Opportunities
                    </Link>

                    <Link to="/recommendations">
                        Recommendations
                    </Link>

                    <Link to="/assistant">
                        AI Assistant
                    </Link>

                </div>

            </div>

        </nav>
    );
}


export default Navbar;