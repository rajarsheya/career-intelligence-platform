import { useState } from "react";

function SearchBar({ onSearch, loading = false }) {
const [query, setQuery] = useState("");
const [searchMode, setSearchMode] = useState("semantic");


function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    onSearch(trimmedQuery, searchMode);
}

function handleClear() {
    setQuery("");
    onSearch("", searchMode);
}

return (
    <div className="search-container">

        <form
            className="search-bar"
            onSubmit={handleSubmit}
        >

            <div className="search-input-wrapper">

                <span
                    className="search-icon"
                    aria-hidden="true"
                >
                    ⌕
                </span>

                <input
                    type="text"
                    placeholder={
                        searchMode === "semantic"
                            ? "Describe what you're looking for..."
                            : "Search by title, organization, country..."
                    }
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                    aria-label="Search opportunities"
                    disabled={loading}
                />

                {query && (
                    <button
                        type="button"
                        className="clear-search"
                        onClick={handleClear}
                        aria-label="Clear search"
                        disabled={loading}
                    >
                        ×
                    </button>
                )}

            </div>

            <button
                type="submit"
                className="search-button"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="button-spinner" />
                        Searching...
                    </>
                ) : (
                    <>
                        Search
                        <span aria-hidden="true"> →</span>
                    </>
                )}
            </button>

        </form>

        <div className="search-options">

            <button
                type="button"
                className={
                    searchMode === "semantic"
                        ? "search-mode active"
                        : "search-mode"
                }
                onClick={() =>
                    setSearchMode("semantic")
                }
                disabled={loading}
            >
                <span className="mode-icon">
                    ✦
                </span>

                <span>
                    <strong>Semantic Search</strong>
                    <small>
                        Understands meaning
                    </small>
                </span>
            </button>

            <button
                type="button"
                className={
                    searchMode === "keyword"
                        ? "search-mode active"
                        : "search-mode"
                }
                onClick={() =>
                    setSearchMode("keyword")
                }
                disabled={loading}
            >
                <span className="mode-icon">
                    #
                </span>

                <span>
                    <strong>Keyword Search</strong>
                    <small>
                        Exact text matching
                    </small>
                </span>
            </button>

        </div>

        {searchMode === "semantic" && (
            <p className="search-help">
                Try something like
                {" "}
                <em>
                    "machine learning internships for
                    computer science students"
                </em>
            </p>
        )}

    </div>
);


}

export default SearchBar;
