from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

PUBLIC = Path(__file__).resolve().parent / "public"
app = FastAPI(title="直播营销策划成果")
app.mount("/assets", StaticFiles(directory=PUBLIC / "assets"), name="assets")
app.mount("/knowledge", StaticFiles(directory=PUBLIC / "knowledge"), name="knowledge")
app.mount("/results", StaticFiles(directory=PUBLIC / "results"), name="results")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def home():
    return FileResponse(PUBLIC / "index.html")
