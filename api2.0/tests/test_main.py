from fastapi.testclient import TestClient
from app.main import app


def test_root():
    client = TestClient(app)

    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "status_code": 200,
        "detail": "ok",
        "result": "working"
    }
