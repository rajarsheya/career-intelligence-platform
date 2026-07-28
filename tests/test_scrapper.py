from tests.conftest import client


def test_run_scraper():

    response = client.post("/scrapers/run")

    assert response.status_code == 200

    assert "message" in response.json()