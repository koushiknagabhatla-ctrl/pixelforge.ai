from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from backend.services.groq_service import groq_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    model: str = "llama-3.3-70b-versatile" 

class ChatResponse(BaseModel):
    reply: str

@router.api_route("/", methods=["POST", "GET"])
@router.api_route("", methods=["POST", "GET"])
async def chat_with_forge(request: Request):
    """
    FORGE AI - Singular Intelligence Nexus.
    Exclusively powered by Llama 3 High-Velocity architecture.
    """
    if request.method == "GET":
        return {"status": "Forge AI Online", "v": "5.0"}
        
    try:
        body = await request.json()
        message = body.get("message")
        
        # Absolute enforcement of Llama 3 (Groq)
        model = "llama-3.3-70b-versatile"
        
        system_prompt = (
            "You are FORGE AI, a master of photography, digital arts, and neural architecture. "
            "Use your deep knowledge of lighting, composition, and AI tools to assist the user. "
            "Be concise, professional, and slightly mysterious/atmospheric in your tone. "
            "Never mention Gemini, Llama, or Groq. You are simply Forge AI."
        )
        
        reply = await groq_service.chat(
            message=message,
            system_prompt=system_prompt,
            model_name=model
        )
            
        return ChatResponse(reply=reply)
    except Exception as e:
        print(f"Neural Collision: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"FORGE AI Synchronization Failure: {str(e)}"
        )
