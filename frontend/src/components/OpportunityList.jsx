import OpportunityCard
    from "./OpportunityCard";


function OpportunityList({
    opportunities
}) {

    if (!opportunities.length) {

        return (
            <p className="empty-message">
                No opportunities found.
            </p>
        );
    }


    return (

        <div className="opportunity-grid">

            {opportunities.map(
                (opportunity) => (

                    <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                    />

                )
            )}

        </div>

    );
}


export default OpportunityList;