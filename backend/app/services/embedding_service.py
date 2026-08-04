from sentence_transformers import SentenceTransformer


class EmbeddingService:

    def __init__(self):

        self.model = SentenceTransformer(
            "sentence-transformers/all-mpnet-base-v2"
        )

    def generate_embedding(
        self,
        text: str,
    ):

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()


def build_opportunity_text(opportunity):

    return f"""
Title: {opportunity.title}

Organization: {opportunity.organization}

Type: {opportunity.opportunity_type}

Country: {opportunity.country}

Description:
{opportunity.description}

Requirements:
{opportunity.requirements}
""".strip()


embedding_service = EmbeddingService()