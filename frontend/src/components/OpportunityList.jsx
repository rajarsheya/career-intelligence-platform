import OpportunityCard from "./OpportunityCard";

function OpportunityList({
opportunities = [],
searchQuery = "",
}) {
if (!Array.isArray(opportunities)) {
return ( <div className="empty-message"> <h3>Unable to display opportunities</h3> <p>
The server returned an unexpected response. </p> </div>
);
}


if (opportunities.length === 0) {
    return (
        <div className="empty-message">

            <div className="empty-icon">
                ◌
            </div>

            <h3>
                No opportunities found
            </h3>

            <p>
                {searchQuery
                    ? `We couldn't find any opportunities matching "${searchQuery}".`
                    : "There are no opportunities available right now."}
            </p>

            {searchQuery && (
                <p className="empty-hint">
                    Try a broader search or describe what
                    you're looking for in natural language.
                </p>
            )}

        </div>
    );
}

return (
    <section className="opportunity-results">

        <div className="results-header">

            <div>
                <span className="results-count">
                    {opportunities.length}
                </span>

                <span className="results-label">
                    {opportunities.length === 1
                        ? " opportunity found"
                        : " opportunities found"}
                </span>
            </div>

        </div>

        <div className="opportunity-grid">

            {opportunities.map((opportunity) => (
                <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                />
            ))}

        </div>

    </section>
);


}

export default OpportunityList;
