from fastapi import APIRouter, HTTPException, Request
from backend.models.schemas import EnhanceRequest, EnhanceResponse
from backend.services import gemini_service, cloudinary_service, supabase_service
import uuid
import asyncio
from pydantic import BaseModel

class GenerateRequest(BaseModel):
    prompt: str
    user_id: str

class GenerateResponse(BaseModel):
    image_url: str
    enhanced_prompt: str
    user_id: str

router = APIRouter()

@router.post("/")
async def generate_image(request: GenerateRequest):
    """
    Forge a new image using the Imagen 3 Engine powered by Gemini.
    """
    try:
        # 1. Optimize Prompt
        enhanced_prompt = await gemini_service.optimize_prompt(request.prompt)
        
        # 2. Forge Image (Imagen 3)
        image_bytes = await gemini_service.generate_image(enhanced_prompt)

        # 3. Synchronize with Cloudinary
        upload_result = await cloudinary_service.upload_image(
            file_bytes=image_bytes,
            filename=f"forge_{uuid.uuid4()}.jpg"
        )
        
        image_url = upload_result.get("image_url")
        if not image_url:
            raise HTTPException(status_code=500, detail="Matrix synchronization failed (Upload).")

        # 4. Save to Neural Archives (Supabase)
        await supabase_service.save_enhancement(
            user_id=request.user_id,
            original_url=request.prompt,  # Store prompt as original ref
            enhanced_url=image_url,
            mode="generate",
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
