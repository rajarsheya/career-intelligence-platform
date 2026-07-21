from scrapers.opportunity import OpportunityData


class OpportunityValidator:

    @staticmethod
    def validate(opportunity: OpportunityData):

        if not opportunity.title:

            return False

        if not opportunity.url:

            return False

        return True