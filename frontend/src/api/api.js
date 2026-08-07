
const API_BASE_URL = "http://127.0.0.1:8000";


async function request(
    endpoint,
    options = {}
) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        }
    );
    if (!response.ok) {
        const errorText =
            await response.text();
        throw new Error(
            errorText ||
            `Request failed: ${response.status}`
        );
    }
    return response.json();
}


export async function getOpportunities(
    params = {}
) {
    const query =
        new URLSearchParams();
    Object.entries(params).forEach(
        ([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                query.append(key, value);
            }
        }
    );
    return request(
        `/opportunities/?${query.toString()}`
    );
}


export async function getOpportunity(
    id
) {
    return request(
        `/opportunities/${id}`
    );
}


export async function semanticSearch(
    query,
    limit = 10
) {

    return request(
        `/opportunities/semantic-search?q=${encodeURIComponent(
            query
        )}&limit=${limit}`
    );
}


export async function searchOpportunities(query) {
    const response = await fetch(
        `${API_BASE_URL}/opportunities/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search opportunities");
    }

    return response.json();
}


export async function getSimilarOpportunities(opportunityId) {
    const response = await fetch(
        `${API_BASE_URL}/opportunities/${opportunityId}/similar`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch similar opportunities");
    }

    return response.json();
}


export async function healthCheck() {

    return request("/health");
}

export async function getRecommendations(
    resumeFile,
    limit = 10
) {
    const formData = new FormData();
    formData.append(
        "file",
        resumeFile
    );
    const response = await fetch(
        `${API_BASE_URL}/recommendations/?limit=${limit}`,
        {
            method: "POST",
            body: formData,
        }
    );
    if (!response.ok) {
        const errorText =
            await response.text();

        throw new Error(
            errorText ||
            "Failed to generate recommendations"
        );
    }
    return response.json();
}


export async function askAssistant(
    query
) {
    const response = await fetch(
        `${API_BASE_URL}/assistant/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
            }),
        }
    );
    if (!response.ok) {
        const errorText =
            await response.text();
        throw new Error(
            errorText ||
            "Failed to contact AI assistant"
        );
    }
    return response.json();
}