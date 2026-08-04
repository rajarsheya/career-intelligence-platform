import { Link } from "react-router-dom";


function OpportunityCard({
    opportunity
}) {

    return (

        <div className="opportunity-card">

            <h3>
                {opportunity.title}
            </h3>

            <p className="organization">
                {opportunity.organization}
            </p>

            <div className="opportunity-meta">

                <span>
                    {opportunity.opportunity_type}
                </span>

                <span>
                    {opportunity.country}
                </span>

            </div>


            {opportunity.description && (

                <p className="description">

                    {opportunity.description.slice(
                        0,
                        200
                    )}

                    {opportunity.description.length >
                        200 && "..."}
                </p>

            )}


            <Link
                to={`/opportunities/${opportunity.id}`}
                className="view-button"
            >
                View Details
            </Link>

        </div>

    );
}


export default OpportunityCard;