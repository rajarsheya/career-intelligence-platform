import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import OpportunityDetailsPage from "./pages/OpportunityDetailsPage";
import Footer from "./components/Footer";


function App() {

    return (
        <BrowserRouter>

            <div className="app">

                <Navbar />

                <main className="app-content">

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

                    <Footer />

                </main>

            </div>

        </BrowserRouter>
    );
}


export default App;