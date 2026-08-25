from pathlib import Path
import os

import httpx
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

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


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(payload: ChatRequest):
    """Call the user's OpenAI-compatible model without exposing its key to the browser."""
    api_key = os.getenv("LLM_API_KEY", "").strip()
    base_url = os.getenv("LLM_BASE_URL", "").rstrip("/")
    model = os.getenv("LLM_MODEL", "").strip()
    if not api_key or not base_url or not model:
        raise HTTPException(status_code=503, detail="模型尚未配置，请在 CloudBase 设置 LLM_API_KEY、LLM_BASE_URL、LLM_MODEL。")
    system = "你是直播营销策划助手。用简明中文回答；巴西用户文案使用 PT-BR，并明确标注。"
    try:
        async with httpx.AsyncClient(timeout=75) as client:
            response = await client.post(
                f"{base_url}/chat/completions",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": payload.message}], "max_tokens": 900},
            )
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="模型服务暂时不可用。") from exc
    try:
        answer = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="模型返回格式异常。") from exc
    return {"answer": answer}
