from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services import deepseek_service

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat_with_forge(request: ChatRequest):
    """
    Photography Expert Chat powered by DeepSeek.
    """
    system_prompt = (
        "You are the Pixel Forge Photography Expert. You have deep knowledge of "
        "photography, lighting, camera settings (ISO, Aperture, Shutter Speed), "
        "and digital post-processing. Answer questions professionally and concisely. "
        "If a user asks about the forge tools, explain how they relate to photography."
    )
    
    try:
        reply = await deepseek_service.prompt_deepseek(
            prompt=request.message,
            system_prompt=system_prompt
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
