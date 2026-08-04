from tests.conftest import client


def test_get_opportunities():

    response = client.get("/opportunities")

    assert response.status_code == 200

    assert isinstance(response.json(), list)


def test_search():

    response = client.get(
        "/opportunities/search?q=Google"
    )

    assert response.status_code == 200

    assert isinstance(response.json(), list)


def test_invalid_id():

    response = client.get("/opportunities/999999")

    assert response.status_code == 404


def test_create():

    response = client.post(
        "/opportunities",
        json={
            "title": "Testing Internship",
            "organization": "Google",
            "opportunity_type": "Internship",
            "country": "USA",
            "deadline": None,
            "url": "https://example.com",
            "description": "Test",
            "requirements": "Python"
        }
    )

    assert response.status_code == 201

    body = response.json()

    assert body["title"] == "Testing Internship"


def test_filter_by_country():

    response = client.get(
        "/opportunities/?country=United States"
    )

    assert response.status_code == 200


def test_keyword_filter():

    response = client.get(
        "/opportunities/?keyword=Python"
    )

    assert response.status_code == 200


def test_pagination():

    response = client.get(
        "/opportunities/?skip=0&limit=2"
    )

    assert response.status_code == 200

    assert len(response.json()) <= 2


def test_sorting():

    response = client.get(
        "/opportunities/?sort_by=title&sort_order=asc"
    )

    assert response.status_code == 200


def test_similar_opportunities():

    response = client.get(
        "/opportunities/1/similar"
    )

    assert response.status_code == 200