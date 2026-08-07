import { useState } from "react";

import {
askAssistant
} from "../api/api";

function Assistant() {

const [
    query,
    setQuery
] = useState("");

const [
    answer,
    setAnswer
] = useState("");

const [
    opportunities,
    setOpportunities
] = useState([]);

const [
    loading,
    setLoading
] = useState(false);

const [
    error,
    setError
] = useState("");


async function handleSubmit(event) {

    event.preventDefault();

    if (!query.trim()) {
        return;
    }

    try {

        setLoading(true);
        setError("");

        const data =
            await askAssistant(
                query
            );

        setAnswer(
            data.answer
        );

        setOpportunities(
            data.opportunities || []
        );

    } catch (err) {

        setError(
            err.message
        );

    } finally {

        setLoading(false);
    }
}


return (

    <main className="page assistant-page">

        <div className="assistant-header">

            <span className="section-label">
                AI CAREER ASSISTANT
            </span>

            <h1>
                Ask about opportunities
            </h1>

            <p>
                Ask questions about scholarships,
                internships, jobs, requirements,
                deadlines, and career opportunities.
            </p>

        </div>


        <section className="assistant-container">

            <div className="assistant-message">

                <div className="assistant-avatar">
                    AI
                </div>

                <div>
                    <strong>
                        Career Assistant
                    </strong>

                    <p>
                        Hi! Ask me about the
                        opportunities available
                        on the platform.
                    </p>
                </div>

            </div>


            {answer && (

                <div className="assistant-response">

                    <div className="assistant-avatar">
                        AI
                    </div>

                    <div>

                        <strong>
                            Career Assistant
                        </strong>

                        <p>
                            {answer}
                        </p>

                    </div>

                </div>

            )}


            {error && (
                <p className="error">
                    {error}
                </p>
            )}


            <form
                className="assistant-input"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    value={query}
                    onChange={(event) =>
                        setQuery(
                            event.target.value
                        )
                    }
                    placeholder="Ask something like: Find software engineering internships in the US..."
                />

                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >
                    {loading
                        ? "Thinking..."
                        : "Ask"}
                </button>

            </form>

        </section>


        {opportunities.length > 0 && (

            <section className="assistant-results">

                <h2>
                    Relevant Opportunities
                </h2>

                <div className="opportunity-grid">

                    {opportunities.map(
                        (opportunity) => (

                            <div
                                className="opportunity-card"
                                key={
                                    opportunity.id
                                }
                            >

                                <h3>
                                    {
                                        opportunity.title
                                    }
                                </h3>

                                <p className="organization">
                                    {
                                        opportunity.organization
                                    }
                                </p>

                                <p className="description">
                                    {
                                        opportunity.description
                                    }
                                </p>

                            </div>

                        )
                    )}

                </div>

            </section>

        )}

    </main>
);

}

export default Assistant;
