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