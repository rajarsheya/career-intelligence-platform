function OpportunityDetails({
    opportunity
}) {

    if (!opportunity) {

        return (
            <p>
                Opportunity not found.
            </p>
        );
    }


    return (

        <article className="opportunity-details">

            <h1>
                {opportunity.title}
            </h1>

            <h3>
                {opportunity.organization}
            </h3>


            <div className="details-meta">

                <p>
                    <strong>Type:</strong>{" "}
                    {opportunity.opportunity_type}
                </p>

                <p>
                    <strong>Country:</strong>{" "}
                    {opportunity.country}
                </p>

                <p>
                    <strong>Deadline:</strong>{" "}
                    {opportunity.deadline || "Not specified"}
                </p>

            </div>


            <section>

                <h2>
                    Description
                </h2>

                <p>
                    {opportunity.description}
                </p>

            </section>


            <section>

                <h2>
                    Requirements
                </h2>

                <p>
                    {opportunity.requirements}
                </p>

            </section>


            {opportunity.url && (

                <a
                    href={opportunity.url}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-button"
                >
                    Visit Opportunity
                </a>

            )}

        </article>

    );
}


export default OpportunityDetails;