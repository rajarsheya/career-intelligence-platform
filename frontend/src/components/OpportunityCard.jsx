import { Link } from "react-router-dom";

function OpportunityCard({ opportunity }) {
if (!opportunity) {
return null;
}


const {
    id,
    title = "Untitled Opportunity",
    organization = "Organization not specified",
    opportunity_type = "Opportunity",
    country = "Location not specified",
    deadline,
    description,
    url,
    match_score,
    similarity_score,
} = opportunity;

const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
      })
    : null;

const score = match_score ?? similarity_score;

return (
    <article className="opportunity-card">

        <div className="opportunity-card-top">

            <span className="opportunity-type">
                {opportunity_type}
            </span>

            {score !== undefined && score !== null && (
                <span className="match-score">
                    {typeof score === "number"
                        ? `${Math.round(score)}% Match`
                        : score}
                </span>
            )}

        </div>

        <div className="opportunity-card-content">

            <h3 className="opportunity-title">
                {title}
            </h3>

            <p className="organization">
                {organization}
            </p>

            <div className="opportunity-info">

                {country && (
                    <span>
                        <span className="info-icon">⌖</span>
                        {country}
                    </span>
                )}

                {formattedDeadline && (
                    <span>
                        <span className="info-icon">◷</span>
                        {formattedDeadline}
                    </span>
                )}

            </div>

            {description && (
                <p className="description">
                    {description.length > 180
                        ? `${description.slice(0, 180)}...`
                        : description}
                </p>
            )}

        </div>

        <div className="opportunity-card-footer">

            {url ? (
                <span className="external-indicator">
                    Application available
                </span>
            ) : (
                <span className="external-indicator">
                    Details available
                </span>
            )}

            <Link
                to={`/opportunities/${id}`}
                className="view-button"
            >
                View Details
                <span aria-hidden="true"> →</span>
            </Link>

        </div>

    </article>
);


}

export default OpportunityCard;
