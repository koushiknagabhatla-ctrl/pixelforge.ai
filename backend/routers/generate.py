from fastapi import APIRouter, HTTPException
from backend.services import gemini_service, supabase_service
from pydantic import BaseModel
import uuid

class GenerateRequest(BaseModel):
    prompt: str
    user_id: str

class GenerateResponse(BaseModel):
    image_url: str
    enhanced_prompt: str
    user_id: str

# Fixed: Using empty string so both /generate and /generate/ work correctly depending on main.py mount
router = APIRouter()

@router.post("")
@router.post("/")
async def generate_image(request: GenerateRequest):
    """
    Forge a new image using the Segmind Flux Engine.
    Optimized for high-fidelity architectural and photography concepts.
    """
    try:
        # 1. Optimize Prompt
        enhanced_prompt = await gemini_service.optimize_prompt(request.prompt)
        
        from backend.services.nvidia_service import nvidia_service
        
        # 2. Forge Image (NVIDIA NIM)
        image_url = await nvidia_service.generate_image(enhanced_prompt)
        if not image_url:
             raise HTTPException(status_code=500, detail="NVIDIA Network synchronization failed.")

        # 4. Save to Neural Archives (Supabase)
        await supabase_service.save_enhancement(
            user_id=request.user_id,
            original_url=request.prompt,
            enhanced_url=image_url,
            mode="flux",
            scale=1
        )

        return GenerateResponse(
            image_url=image_url,
            enhanced_prompt=enhanced_prompt,
            user_id=request.user_id
        )
    except Exception as e:
        print(f"Forge Critical Failure: {e}")
        raise HTTPException(status_code=500, detail=f"Architecture Failure: {str(e)}")
