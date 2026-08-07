import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    getOpportunity,
    getSimilarOpportunities
} from "../api/api";

import OpportunityDetails
from "../components/OpportunityDetails";

import OpportunityList
from "../components/OpportunityList";


function OpportunityDetailsPage() {

    const { id } =
        useParams();


    const [
        opportunity,
        setOpportunity
    ] = useState(null);


    const [
        similarOpportunities,
        setSimilarOpportunities
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        recommendationsLoading,
        setRecommendationsLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        recommendationsError,
        setRecommendationsError
    ] = useState("");


    useEffect(() => {

        async function loadOpportunity() {

            try {

                setLoading(true);
                setError("");


                const data =
                    await getOpportunity(id);


                setOpportunity(data);

            } catch (err) {

                console.error(
                    "Failed to load opportunity:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load opportunity."
                );

            } finally {

                setLoading(false);

            }
        }


        async function loadSimilarOpportunities() {

            try {

                setRecommendationsLoading(
                    true
                );

                setRecommendationsError("");


                const data =
                    await getSimilarOpportunities(
                        id
                    );


                setSimilarOpportunities(
                    Array.isArray(data)
                        ? data
                        : data.items || []
                );

            } catch (err) {

                console.error(
                    "Failed to load similar opportunities:",
                    err
                );

                setRecommendationsError(
                    err.message ||
                    "Unable to load similar opportunities."
                );

            } finally {

                setRecommendationsLoading(
                    false
                );

            }
        }


        if (id) {

            loadOpportunity();

            loadSimilarOpportunities();

        }

    }, [id]);


    if (loading) {

        return (

            <main className="page">

                <section className="loading-state">

                    <div className="loading-spinner" />

                    <p>
                        Loading opportunity...
                    </p>

                </section>

            </main>

        );

    }


    if (error) {

        return (

            <main className="page">

                <section className="error-state">

                    <h2>
                        Unable to load opportunity
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/opportunities"
                        className="primary-button"
                    >
                        Back to Opportunities
                    </Link>

                </section>

            </main>

        );

    }


    if (!opportunity) {

        return (

            <main className="page">

                <section className="empty-state">

                    <h2>
                        Opportunity not found
                    </h2>

                    <Link
                        to="/opportunities"
                        className="primary-button"
                    >
                        Browse Opportunities
                    </Link>

                </section>

            </main>

        );

    }


    return (

        <main className="page opportunity-details-page">

            {/* Breadcrumb */}

            <nav className="breadcrumb">

                <Link to="/">
                    Home
                </Link>

                <span>
                    /
                </span>

                <Link to="/opportunities">
                    Opportunities
                </Link>

                <span>
                    /
                </span>

                <span>
                    Details
                </span>

            </nav>


            {/* Opportunity */}

            <section className="opportunity-main">

                <OpportunityDetails
                    opportunity={
                        opportunity
                    }
                />

            </section>


            {/* Similar opportunities */}

            <section className="similar-section">

                <div className="section-heading">

                    <span className="section-label">
                        RECOMMENDED
                    </span>

                    <h2>
                        Similar Opportunities
                    </h2>

                    <p>
                        Opportunities that are
                        semantically similar to this one.
                    </p>

                </div>


                {recommendationsLoading && (

                    <div className="loading-state">

                        <div className="loading-spinner" />

                        <p>
                            Finding similar opportunities...
                        </p>

                    </div>

                )}


                {!recommendationsLoading &&
                    recommendationsError && (

                    <div className="error-state">

                        <h3>
                            Recommendations unavailable
                        </h3>

                        <p>
                            {recommendationsError}
                        </p>

                    </div>

                )}


                {!recommendationsLoading &&
                    !recommendationsError &&
                    similarOpportunities.length === 0 && (

                    <div className="empty-state">

                        <h3>
                            No similar opportunities found
                        </h3>

                        <p>
                            We couldn't find any closely
                            related opportunities yet.
                        </p>

                    </div>

                )}


                {!recommendationsLoading &&
                    !recommendationsError &&
                    similarOpportunities.length > 0 && (

                    <OpportunityList
                        opportunities={
                            similarOpportunities
                        }
                    />

                )}

            </section>

        </main>

    );

}


export default OpportunityDetailsPage;