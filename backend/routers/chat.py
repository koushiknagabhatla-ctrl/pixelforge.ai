from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from backend.services.gemini_service import gemini_service
from backend.services.groq_service import groq_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    model: str = "llama-3.3-70b-versatile" # Defauting to Groq for v4.0

class ChatResponse(BaseModel):
    reply: str

@router.api_route("/", methods=["POST", "GET"])
@router.api_route("", methods=["POST", "GET"])
async def chat_with_forge(request: Request):
    """
    Photography & Architecture Expert Chat (Slash & Method Agnostic).
    Supports Gemini (Visual Intel) and Groq (High Velocity).
    """
    if request.method == "GET":
        return {"status": "Neural Nexus Online", "v": "4.0"}
        
    try:
        body = await request.json()
        message = body.get("message")
        model = body.get("model", "llama-3.3-70b-versatile")
        
        system_prompt = (
            "You are the Pixel Forge Archon, a master of photography, digital arts, and neural architecture. "
            "Use your deep knowledge of lighting, composition, and AI tools to assist the user. "
            "Be concise, professional, and slightly mysterious/atmospheric in your tone."
        )
        
        # Routing Logic: Determine engine based on model name
        if "gemini" in model.lower():
            reply = await gemini_service.chat(
                message=message,
                system_prompt=system_prompt,
                model_name=model
            )
        else:
            # Default to Groq for high-velocity response
            reply = await groq_service.chat(
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
