import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar
    from "./components/Navbar";

import Home
    from "./pages/Home";

import Opportunities
    from "./pages/Opportunities";

import OpportunityDetailsPage
    from "./pages/OpportunityDetailsPage";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/opportunities"
                    element={<Opportunities />}
                />

                <Route
                    path="/opportunities/:id"
                    element={
                        <OpportunityDetailsPage />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;