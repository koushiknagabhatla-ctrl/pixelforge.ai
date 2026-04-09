from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import gemini_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    model: str = "gemini-1.5-pro"

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat_with_forge(request: ChatRequest):
    """
    Photography & Architecture Expert Chat powered by Gemini.
    """
    system_prompt = (
        "You are the Pixel Forge Archon, a master of photography, digital arts, and neural architecture. "
        "User your deep knowledge of lighting, composition, and AI tools to assist the user. "
        "Be concise, professional, and slightly mysterious/atmospheric in your tone."
    )
    
    try:
        reply = await gemini_service.chat(
            message=request.message,
            system_prompt=system_prompt,
            model_name=request.model
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
