from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from backend.services.gemini_service import gemini_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    model: str = "gemini-1.5-pro"

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat_with_forge(request: Request):
    """
    Photography & Architecture Expert Chat powered by Gemini.
    """
    try:
        body = await request.json()
        message = body.get("message")
        model = body.get("model", "gemini-1.5-pro")
        
        system_prompt = (
            "You are the Pixel Forge Archon, a master of photography, digital arts, and neural architecture. "
            "User your deep knowledge of lighting, composition, and AI tools to assist the user. "
            "Be concise, professional, and slightly mysterious/atmospheric in your tone."
        )
        
        reply = await gemini_service.chat(
            message=message,
            system_prompt=system_prompt,
            model_name=model
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        print(f"Chat Collision: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Neural Nexus Synchronization Failure: {str(e)}"
        )
