import { Link } from "react-router-dom";


function Home() {

    return (

        <main className="home">

            <section className="hero">

                <h1>
                    Scholarship & Career
                    Intelligence Platform
                </h1>

                <p>
                    Discover scholarships,
                    internships, jobs and
                    career opportunities using
                    intelligent search and
                    personalized recommendations.
                </p>

                <Link
                    to="/opportunities"
                    className="primary-button"
                >
                    Explore Opportunities
                </Link>

            </section>


            <section className="features">

                <div className="feature-card">

                    <h3>
                        Smart Search
                    </h3>

                    <p>
                        Search opportunities using
                        semantic AI-powered search.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        Personalized Matching
                    </h3>

                    <p>
                        Find opportunities that
                        match your skills and
                        experience.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        AI Assistant
                    </h3>

                    <p>
                        Ask questions about
                        scholarships and career
                        opportunities.
                    </p>

                </div>

            </section>

        </main>
    );
}


export default Home;