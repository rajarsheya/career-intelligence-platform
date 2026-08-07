import { Link } from "react-router-dom";

function Footer() {
return ( <footer className="footer"> <div className="footer-container">
            <div className="footer-brand">
                <Link to="/" className="footer-logo">
                    Scholarship & Career Intelligence
                </Link>

                <p>
                    An intelligent platform for discovering
                    scholarships, internships, jobs, and
                    career opportunities.
                </p>
            </div>

            <div className="footer-links">
                <h4>Explore</h4>

                <Link to="/">Home</Link>
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

            <div className="footer-links">
                <h4>Platform</h4>

                <span>Semantic Search</span>
                <span>Personalized Matching</span>
                <span>AI Assistant</span>
            </div>

        </div>

        <div className="footer-bottom">
            <p>
                © {new Date().getFullYear()} Scholarship & Career
                Intelligence Platform
            </p>

            <p>
                Built with React & FastAPI
            </p>
        </div>
    </footer>
);

}

export default Footer;
