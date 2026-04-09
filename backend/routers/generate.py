from fastapi import APIRouter, HTTPException
from backend.models.schemas import EnhanceRequest, EnhanceResponse
from backend.services import gemini_service, cloudinary_service, supabase_service
import uuid
import httpx
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
    Forge a new image using the Flux Engine powered by Pollinations AI.
    Optimized for high-fidelity architectural and photography concepts.
    """
    try:
        # 1. Optimize Prompt (We still use Gemini Flash for this as it's superior at prompt engineering)
        enhanced_prompt = await gemini_service.optimize_prompt(request.prompt)
        
        # 2. Forge Image (Flux via Pollinations)
        # We encode the prompt for URL safety
        import urllib.parse
        safe_prompt = urllib.parse.quote(enhanced_prompt)
        pollinations_url = f"https://gen.pollinations.ai/image/{safe_prompt}?model=flux&width=1024&height=1024&nologo=true"
        
        # 3. Synchronize with Cloudinary (Download from Pollinations and host on Cloudinary)
        async with httpx.AsyncClient() as client:
            image_response = await client.get(pollinations_url, timeout=30.0)
            if image_response.status_code != 200:
                 raise HTTPException(status_code=500, detail="Pollinations Matrix synchronization failed.")
            image_bytes = image_response.content

        upload_result = await cloudinary_service.upload_image(
            file_bytes=image_bytes,
            filename=f"flux_{uuid.uuid4()}.jpg"
        )
        
        image_url = upload_result.get("image_url")
        if not image_url:
            raise HTTPException(status_code=500, detail="Cloudinary synchronization failed.")

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
