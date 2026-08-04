from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_semantic_search():

    response = client.get(
        "/opportunities/semantic-search?q=machine learning"
    )

    assert response.status_code == 200