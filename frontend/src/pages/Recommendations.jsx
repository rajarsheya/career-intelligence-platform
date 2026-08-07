import { useState } from "react";

import OpportunityList
from "../components/OpportunityList";

import {
getRecommendations
} from "../api/api";

function Recommendations() {


const [
    resume,
    setResume
] = useState(null);

const [
    recommendations,
    setRecommendations
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

    if (!resume) {
        setError(
            "Please select a PDF resume."
        );

        return;
    }

    try {

        setLoading(true);
        setError("");

        const data =
            await getRecommendations(
                resume
            );

        setRecommendations(data);

    } catch (err) {

        setError(
            err.message
        );

    } finally {

        setLoading(false);

    }
}


return (

    <main className="page">

        <div className="recommendations-header">

            <span className="section-label">
                PERSONALIZED MATCHING
            </span>

            <h1>
                Recommended Opportunities
            </h1>

            <p>
                Upload your resume and discover
                opportunities that best match
                your skills and experience.
            </p>

        </div>


        <form
            className="resume-upload"
            onSubmit={handleSubmit}
        >

            <div className="upload-content">

                <h2>
                    Upload your resume
                </h2>

                <p>
                    We'll analyze your resume and
                    find semantically relevant
                    opportunities.
                </p>

                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(event) =>
                        setResume(
                            event.target.files[0]
                        )
                    }
                />

            </div>


            <button
                type="submit"
                className="primary-button"
                disabled={loading}
            >
                {loading
                    ? "Finding Matches..."
                    : "Find My Matches"}
            </button>

        </form>


        {error && (
            <p className="error">
                {error}
            </p>
        )}


        {!loading &&
            recommendations.length > 0 && (

                <section className="recommendation-results">

                    <div className="results-heading">

                        <h2>
                            Your Matches
                        </h2>

                        <span>
                            {recommendations.length}
                            {" "}opportunities
                        </span>

                    </div>

                    <OpportunityList
                        opportunities={
                            recommendations
                        }
                    />

                </section>

            )}

    </main>
);


}

export default Recommendations;
