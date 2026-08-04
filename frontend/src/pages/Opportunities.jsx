import { useEffect, useState } from "react";

import SearchBar
    from "../components/SearchBar";

import OpportunityList
    from "../components/OpportunityList";

import {
    getOpportunities,
    semanticSearch
} from "../api/api";


function Opportunities() {

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


    async function loadOpportunities() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getOpportunities();

            setOpportunities(data);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    async function handleSearch(
        query
    ) {

        if (!query.trim()) {

            loadOpportunities();

            return;
        }


        try {

            setLoading(true);
            setError("");

            const data =
                await semanticSearch(query);

            setOpportunities(data);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadOpportunities();

    }, []);


    return (

        <main className="page">

            <h1>
                Opportunities
            </h1>

            <SearchBar
                onSearch={handleSearch}
            />


            {loading && (
                <p>Loading opportunities...</p>
            )}


            {error && (
                <p className="error">
                    {error}
                </p>
            )}


            {!loading && !error && (

                <OpportunityList
                    opportunities={opportunities}
                />

            )}

        </main>
    );
}


export default Opportunities;