import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { semanticSearch } from "../api/api";

function Home() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch(event) {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        try {
            setSearching(true);
            setError("");

            await semanticSearch(trimmedQuery);

            navigate(
                `/opportunities?search=${encodeURIComponent(
                    trimmedQuery
                )}`
            );
        } catch (err) {
            console.error("Semantic search failed:", err);

            setError(
                err.message ||
                    "Unable to perform semantic search."
            );
        } finally {
            setSearching(false);
        }
    }

    return (
        <main className="home">

            {/* Hero */}
            <section className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        AI-Powered Opportunity Discovery
                    </span>

                    <h1>
                        Find opportunities
                        <span className="hero-highlight">
                            {" "}built for your future.
                        </span>
                    </h1>

                    <p>
                        Discover scholarships, internships,
                        jobs, fellowships, and other career
                        opportunities using intelligent
                        semantic search and personalized
                        recommendations.
                    </p>

                    <form
                        className="hero-search"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Try: machine learning internships"
                            aria-label="Search opportunities"
                        />

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={searching}
                        >
                            {searching
                                ? "Searching..."
                                : "Search"}
                        </button>
                    </form>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <div className="hero-actions">

                        <Link
                            to="/opportunities"
                            className="primary-button"
                        >
                            Explore Opportunities
                        </Link>

                        <Link
                            to="/opportunities"
                            className="secondary-button"
                        >
                            Browse All
                        </Link>

                    </div>

                </div>

            </section>

            <section className="platform-section">

 
<div className="section-heading">

    <span className="section-label">
        PLATFORM
    </span>

    <h2>
        Smarter opportunity discovery
    </h2>

    <p>
        Go beyond traditional keyword searching and
        discover opportunities based on meaning,
        relevance, and your goals.
    </p>

</div>


<div className="platform-grid">

    <div className="platform-card">

        <div className="platform-icon">
            🔎
        </div>

        <div>
            <h3>
                Semantic Search
            </h3>

            <p>
                Describe what you're looking for naturally
                and discover opportunities based on their
                meaning, not just matching keywords.
            </p>
        </div>

        <span className="card-arrow">
            →
        </span>

    </div>


    <div className="platform-card">

        <div className="platform-icon">
            ✨
        </div>

        <div>
            <h3>
                Similar Opportunities
            </h3>

            <p>
                Discover related opportunities using
                intelligent similarity matching powered
                by embeddings.
            </p>
        </div>

        <span className="card-arrow">
            →
        </span>

    </div>


    <div className="platform-card">

        <div className="platform-icon">
            🤖
        </div>

        <div>
            <h3>
                AI Assistant
            </h3>

            <p>
                Explore opportunities and get intelligent
                guidance through the platform's AI
                capabilities.
            </p>
        </div>

        <span className="card-arrow">
            →
        </span>

    </div>

</div>
 

</section>

<section className="how-it-works">

 
<div className="section-heading">

    <span className="section-label">
        HOW IT WORKS
    </span>

    <h2>
        From search to opportunity
    </h2>

    <p>
        A simple workflow designed to help you discover
        opportunities that actually match your goals.
    </p>

</div>


<div className="steps">

    <div className="step">

        <div className="step-number">
            01
        </div>

        <div className="step-content">

            <h3>
                Tell us what you want
            </h3>

            <p>
                Search naturally using your interests,
                skills, degree, location, or career goals.
            </p>

        </div>

    </div>


    <div className="step">

        <div className="step-number">
            02
        </div>

        <div className="step-content">

            <h3>
                Discover relevant matches
            </h3>

            <p>
                Semantic search finds opportunities that
                are relevant to what you're actually
                looking for.
            </p>

        </div>

    </div>


    <div className="step">

        <div className="step-number">
            03
        </div>

        <div className="step-content">

            <h3>
                Explore similar opportunities
            </h3>

            <p>
                Open an opportunity and discover related
                opportunities using similarity matching.
            </p>

        </div>

    </div>

</div>
 

</section>

<section className="home-cta">

 
<div className="cta-content">

    <span className="section-label">
        GET STARTED
    </span>

    <h2>
        Ready to find your next opportunity?
    </h2>

    <p>
        Explore the opportunities currently available
        on the platform and find your next step.
    </p>

    <Link
        to="/opportunities"
        className="cta-button"
    >
        Start Exploring
        <span>→</span>
    </Link>

</div>
 

        </section>

            

        </main>
    );
}

export default Home;