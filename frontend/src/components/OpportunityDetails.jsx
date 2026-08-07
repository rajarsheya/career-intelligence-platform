import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSimilarOpportunities } from "../api/api";
import OpportunityCard from "./OpportunityCard";

function OpportunityDetails({ opportunity }) {
const [similarOpportunities, setSimilarOpportunities] = useState([]);
const [similarLoading, setSimilarLoading] = useState(false);
const [similarError, setSimilarError] = useState("");


useEffect(() => {
    if (!opportunity?.id) {
        return;
    }

    async function loadSimilarOpportunities() {
        try {
            setSimilarLoading(true);
            setSimilarError("");

            const data =
                await getSimilarOpportunities(opportunity.id);

            setSimilarOpportunities(
                Array.isArray(data) ? data : []
            );
        } catch (err) {
            setSimilarError(
                err.message ||
                "Unable to load similar opportunities."
            );
        } finally {
            setSimilarLoading(false);
        }
    }

    loadSimilarOpportunities();
}, [opportunity?.id]);

if (!opportunity) {
    return (
        <div className="not-found-card">
            <div className="not-found-icon">?</div>

            <h2>Opportunity not found</h2>

            <p>
                We couldn't find the opportunity you're
                looking for.
            </p>

            <Link
                to="/opportunities"
                className="primary-button"
            >
                Browse Opportunities
            </Link>
        </div>
    );
}

const {
    title = "Untitled Opportunity",
    organization = "Organization not specified",
    opportunity_type = "Opportunity",
    country = "Location not specified",
    deadline,
    url,
    description,
    requirements,
} = opportunity;

const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
      })
    : "Not specified";

return (
    <div className="details-page">

        <Link
            to="/opportunities"
            className="back-link"
        >
            ← Back to Opportunities
        </Link>

        <article className="opportunity-details">

            <div className="details-header">

                <div className="details-header-main">

                    <span className="opportunity-type">
                        {opportunity_type}
                    </span>

                    <h1>{title}</h1>

                    <p className="details-organization">
                        {organization}
                    </p>

                </div>

                <div className="details-actions">
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-button"
                        >
                            Visit Opportunity
                            <span aria-hidden="true">
                                {" "}↗
                            </span>
                        </a>
                    )}
                </div>

            </div>

            <div className="details-meta">

                <div className="meta-item">
                    <span className="meta-label">
                        Location
                    </span>
                    <strong>
                        {country}
                    </strong>
                </div>

                <div className="meta-item">
                    <span className="meta-label">
                        Type
                    </span>
                    <strong>
                        {opportunity_type}
                    </strong>
                </div>

                <div className="meta-item">
                    <span className="meta-label">
                        Deadline
                    </span>
                    <strong>
                        {formattedDeadline}
                    </strong>
                </div>

            </div>

            <div className="details-body">

                <section className="details-section">

                    <h2>About this opportunity</h2>

                    <p>
                        {description ||
                            "No description is available for this opportunity."}
                    </p>

                </section>

                <section className="details-section">

                    <h2>Requirements</h2>

                    <p>
                        {requirements ||
                            "No specific requirements were provided."}
                    </p>

                </section>

            </div>

        </article>

        <section className="similar-section">

            <div className="section-heading">

                <div>
                    <span className="section-eyebrow">
                        INTELLIGENT MATCHING
                    </span>

                    <h2>
                        Similar Opportunities
                    </h2>

                    <p>
                        Explore opportunities with similar
                        characteristics and career paths.
                    </p>
                </div>

            </div>

            {similarLoading && (
                <div className="loading-state">
                    <div className="loading-spinner" />
                    <p>
                        Finding similar opportunities...
                    </p>
                </div>
            )}

            {similarError && (
                <div className="inline-error">
                    {similarError}
                </div>
            )}

            {!similarLoading &&
                !similarError &&
                similarOpportunities.length > 0 && (
                    <div className="opportunity-grid">
                        {similarOpportunities.map(
                            (similar) => (
                                <OpportunityCard
                                    key={similar.id}
                                    opportunity={similar}
                                />
                            )
                        )}
                    </div>
                )}

            {!similarLoading &&
                !similarError &&
                similarOpportunities.length === 0 && (
                    <div className="empty-message">
                        <h3>
                            No similar opportunities found
                        </h3>

                        <p>
                            Try exploring more opportunities
                            using semantic search.
                        </p>

                        <Link
                            to="/opportunities"
                            className="secondary-button"
                        >
                            Explore Opportunities
                        </Link>
                    </div>
                )}

        </section>

    </div>
);


}

export default OpportunityDetails;
