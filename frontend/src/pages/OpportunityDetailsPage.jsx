import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getOpportunity
} from "../api/api";

import OpportunityDetails
    from "../components/OpportunityDetails";


function OpportunityDetailsPage() {

    const { id } = useParams();

    const [
        opportunity,
        setOpportunity
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        async function load() {

            try {

                const data =
                    await getOpportunity(id);

                setOpportunity(data);

            } catch (err) {

                setError(
                    err.message
                );

            } finally {

                setLoading(false);
            }
        }

        load();

    }, [id]);


    if (loading) {

        return (
            <main className="page">
                Loading...
            </main>
        );
    }


    if (error) {

        return (
            <main className="page error">
                {error}
            </main>
        );
    }


    return (

        <main className="page">

            <OpportunityDetails
                opportunity={opportunity}
            />

        </main>
    );
}


export default OpportunityDetailsPage;