from fastapi import Request
from fastapi.responses import JSONResponse


class OpportunityNotFoundException(Exception):
    pass


async def opportunity_not_found_handler(
    request: Request,
    exc: OpportunityNotFoundException,
):
    return JSONResponse(
        status_code=404,
        content={
            "detail": str(exc)
        }
    )


async def generic_exception_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error"
        }
    )