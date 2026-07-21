class Deduplicator:

    @staticmethod
    def remove_duplicates(opportunities):

        seen = set()

        cleaned = []

        for opportunity in opportunities:

            if opportunity.url in seen:

                continue

            seen.add(opportunity.url)

            cleaned.append(opportunity)

        return cleaned