def build_context(opportunities):

    context = []

    for opportunity in opportunities:

        context.append(
            f"""
Title: {opportunity.title}

Organization: {opportunity.organization}

Type: {opportunity.opportunity_type}

Country: {opportunity.country}

Description:
{opportunity.description}

Requirements:
{opportunity.requirements}
""".strip()
        )

    return "\n\n---\n\n".join(context)