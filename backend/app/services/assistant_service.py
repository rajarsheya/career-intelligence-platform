import os

from google import genai

from backend.app.services.semantic_search_service import (
    semantic_search,
)

from backend.app.services.rag_services import (
    build_context,
)


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def ask_assistant(
    db,
    query: str,
    limit: int = 8,
):
    """
    Retrieve relevant opportunities and use
    Gemini to generate a context-aware answer.
    """

    if not query or not query.strip():
        return {
            "answer": "Please enter a question.",
            "opportunities": [],
        }

    opportunities = semantic_search(
        db=db,
        query=query,
        limit=limit,
    )

    if not opportunities:
        return {
            "answer": (
                "I couldn't find any opportunities "
                "that match your question."
            ),
            "opportunities": [],
        }

    context = build_context(
        opportunities
    )

    prompt = f"""
You are an AI assistant for a Scholarship
and Career Intelligence Platform.

Your job is to help users discover and
understand scholarships, internships,
jobs, and other career opportunities.

Use ONLY the opportunity information
provided in the context below.

If the information is not available,
say that you do not have enough information.

Do not invent deadlines, requirements,
organizations, locations, or other details.

User question:
{query}

Available opportunities:
{context}

Provide a helpful and concise answer.

When appropriate:

- Mention relevant opportunity names.
- Mention organizations.
- Explain why an opportunity is relevant.
- Mention important requirements.
- Mention deadlines when available.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return {
        "answer": response.text,
        "opportunities": opportunities,
    }