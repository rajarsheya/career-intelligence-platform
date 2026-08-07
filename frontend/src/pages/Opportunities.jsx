import {
    useEffect,
    useState
} from "react";

import {
    useSearchParams
} from "react-router-dom";

import SearchBar
from "../components/SearchBar";

import OpportunityList
from "../components/OpportunityList";

import {
    getOpportunities,
    searchOpportunities,
    semanticSearch
} from "../api/api";


function Opportunities() {

    const [
        searchParams,
        setSearchParams
    ] = useSearchParams();


    const [
        opportunities,
        setOpportunities
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        searchMode,
        setSearchMode
    ] = useState("semantic");


    const initialQuery =
        searchParams.get("search") || "";


    const [
        activeQuery,
        setActiveQuery
    ] = useState(initialQuery);


    async function loadOpportunities() {

        try {

            setLoading(true);
            setError("");

            const data = await getOpportunities({
                limit: 100,
                skip: 0,
            });

            setOpportunities(
                Array.isArray(data)
                    ? data
                    : data.items || []
            );

        } catch (err) {

            console.error(
                "Failed to load opportunities:",
                err
            );

            setError(
                err.message ||
                "Unable to load opportunities."
            );

        } finally {

            setLoading(false);

        }
    }


    async function handleSearch(query) {

        const trimmedQuery =
            query.trim();


        if (!trimmedQuery) {

            setActiveQuery("");

            setSearchParams({});

            await loadOpportunities();

            return;
        }


        try {

            setLoading(true);
            setError("");

            setActiveQuery(
                trimmedQuery
            );


            setSearchParams({
                search: trimmedQuery
            });


            let data;


            if (
                searchMode ===
                "semantic"
            ) {

                data =
                    await semanticSearch(
                        trimmedQuery
                    );

            } else {

                data =
                    await searchOpportunities(
                        trimmedQuery
                    );

            }


            setOpportunities(
                Array.isArray(data)
                    ? data
                    : data.items || []
            );

        } catch (err) {

            console.error(
                "Search failed:",
                err
            );

            setError(
                err.message ||
                "Unable to search opportunities."
            );

            setOpportunities([]);

        } finally {

            setLoading(false);

        }
    }


    async function handleModeChange(
        mode
    ) {

        setSearchMode(mode);


        if (!activeQuery.trim()) {
            return;
        }


        try {

            setLoading(true);
            setError("");


            let data;


            if (
                mode ===
                "semantic"
            ) {

                data =
                    await semanticSearch(
                        activeQuery
                    );

            } else {

                data =
                    await searchOpportunities(
                        activeQuery
                    );

            }


            setOpportunities(
                Array.isArray(data)
                    ? data
                    : data.items || []
            );

        } catch (err) {

            console.error(
                "Search mode change failed:",
                err
            );

            setError(
                err.message ||
                "Unable to update search."
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        const query =
            searchParams.get("search");


        if (query) {

            setActiveQuery(query);

            handleSearch(query);

        } else {

            loadOpportunities();

        }

        // Intentionally run only when the URL changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [searchParams]);


    return (

        <main className="page opportunities-page">

            {/* Header */}

            <section className="page-header">

                <div>

                    <span className="section-label">
                        DISCOVER
                    </span>

                    <h1>
                        Opportunities
                    </h1>

                    <p>
                        Explore scholarships, internships,
                        jobs, fellowships, and other
                        career opportunities.
                    </p>

                </div>

            </section>


            {/* Search */}

            <section className="search-section">

                <SearchBar
                    onSearch={handleSearch}
                    initialQuery={activeQuery}
                />


                <div className="search-controls">

                    <span className="search-label">
                        Search mode:
                    </span>


                    <button
                        type="button"
                        className={
                            searchMode === "semantic"
                                ? "search-mode active"
                                : "search-mode"
                        }
                        onClick={() =>
                            handleModeChange(
                                "semantic"
                            )
                        }
                    >
                        ✨ Semantic Search
                    </button>


                    <button
                        type="button"
                        className={
                            searchMode === "keyword"
                                ? "search-mode active"
                                : "search-mode"
                        }
                        onClick={() =>
                            handleModeChange(
                                "keyword"
                            )
                        }
                    >
                        🔎 Keyword Search
                    </button>

                </div>

            </section>


            {/* Results summary */}

            {!loading &&
                !error && (

                    <div className="results-summary">

                        <div>

                            <strong>
                                {opportunities.length}
                            </strong>

                            <span>
                                {" "}
                                opportunities found
                            </span>

                        </div>


                        {activeQuery && (

                            <span className="search-query">
                                Results for "
                                {activeQuery}
                                "
                            </span>

                        )}

                    </div>

                )}


            {/* Loading */}

            {loading && (

                <section className="loading-state">

                    <div className="loading-spinner" />

                    <p>
                        Finding relevant opportunities...
                    </p>

                </section>

            )}


            {/* Error */}

            {!loading &&
                error && (

                    <section className="error-state">

                        <h3>
                            Something went wrong
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={
                                loadOpportunities
                            }
                        >
                            Try Again
                        </button>

                    </section>

                )}


            {/* Empty state */}

            {!loading &&
                !error &&
                opportunities.length === 0 && (

                    <section className="empty-state">

                        <div className="empty-icon">
                            🔍
                        </div>

                        <h2>
                            No opportunities found
                        </h2>

                        <p>
                            Try a different search or
                            browse all available
                            opportunities.
                        </p>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={
                                loadOpportunities
                            }
                        >
                            Browse All
                        </button>

                    </section>

                )}


            {/* Results */}

            {!loading &&
                !error &&
                opportunities.length > 0 && (

                    <section className="results-section">

                        <OpportunityList
                            opportunities={
                                opportunities
                            }
                        />

                    </section>

                )}

        </main>

    );
}


export default Opportunities;