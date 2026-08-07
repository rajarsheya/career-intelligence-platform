def build_context(opportunities):
    """
    Convert retrieved opportunities into
    structured context for the AI assistant.
    """

    context = []

    for opportunity in opportunities:
        context.append(
            f"""
Title: {opportunity.title}

Organization: {opportunity.organization}

Type: {opportunity.opportunity_type}

Country: {opportunity.country}

Deadline: {opportunity.deadline}

Description:
{opportunity.description}

Requirements:
{opportunity.requirements}
""".strip()
        )

    return "\n\n---\n\n".join(context)