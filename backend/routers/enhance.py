from fastapi import APIRouter, HTTPException, Request
from models.schemas import EnhanceRequest, EnhanceResponse
from services import local_ai_service, replicate_service, cloudinary_service, supabase_service
import uuid
import asyncio

router = APIRouter(prefix="/api", tags=["enhance"])


@router.post("/enhance", response_model=EnhanceResponse)
async def enhance_image(request_body: EnhanceRequest, request: Request):
    """
    Enhance an image using the Performance Forge Engine (Local) with Abort Protocol.
    """
    
    async def check_cancellation():
        # Check if client has disconnected (e.g., via AbortController)
        return await request.is_disconnected()

    try:
        # Run Local Processing with continuous disconnection checks
        image_bytes = await local_ai_service.process_local(
            image_url=request_body.image_url,
            mode=request_body.mode,
            scale=request_body.scale,
            check_cancellation=check_cancellation
        )

        # Upload processed image
        upload_result = await cloudinary_service.upload_image(
            file_bytes=image_bytes,
            filename=f"enhanced_{uuid.uuid4()}.jpg"
        )
        
        enhanced_url = upload_result.get("image_url")
        if not enhanced_url:
            raise HTTPException(status_code=500, detail="Matrix synchronization failed (Upload).")

        # Save to database
        await supabase_service.save_enhancement(
            user_id=request_body.user_id,
            original_url=request_body.image_url,
            enhanced_url=enhanced_url,
            mode=request_body.mode,
            scale=request_body.scale,
        )

        return EnhanceResponse(
            enhanced_url=enhanced_url,
            original_url=request_body.image_url,
            processing_time=0.0,
            mode=request_body.mode,
            scale=request_body.scale
        )
    except asyncio.CancelledError:
        print("Forge Abort Protocol Initialized: Termination Successful.")
        # We don't need to return anything here as the client has already disconnected
        # But for FastAPI robustness we can just log it
        return None
    except Exception as e:
        print(f"Forge Error: {e}")
        # Final Cloud Fallback (Disabled if specifically aborted, but kept for general failures)
        try:
            output = await replicate_service.enhance_image(
                image_url=request_body.image_url,
                mode=request_body.mode,
                scale=request_body.scale,
            )
            return EnhanceResponse(
                enhanced_url=output["enhanced_url"],
                original_url=request_body.image_url,
                processing_time=0.0,
                mode=request_body.mode,
                scale=request_body.scale
            )
        except:
            raise HTTPException(status_code=500, detail=f"Architecture Failure: {str(e)}")
