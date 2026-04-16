from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import cloudinary_service, supabase_service
from backend.services.replicate_service import enhance_image as replicate_enhance
import uuid

router = APIRouter()

@router.post("/enhance")
@router.post("/enhance/")
async def enhance(user_id: str, file: UploadFile = File(...)):
    """
    Enhanced Image Processor using Replicate Real-ESRGAN natively.
    """
    try:
        contents = await file.read()
        
        # 1. Cloudinary upload FIRST (Replicate requires a standard URL)
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        raw_url = raw_res.get("image_url")
        if not raw_url:
            raise HTTPException(status_code=500, detail="Cloudinary upload failure.")

        # 2. Enhance using Replicate
        rep_result = await replicate_enhance(
            image_url=raw_url,
            mode="enhance", 
            scale=2
        )
        ephemeral_url = rep_result.get("enhanced_url")
        if not ephemeral_url:
             raise HTTPException(status_code=500, detail="Replicate upscaler processing failed.")
        
        # 3. Permanent Hosting
        final_res = await cloudinary_service.upload_from_url(url=ephemeral_url)
        public_url = final_res.get("image_url")
        
        # 4. Save History
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=raw_url,
            enhanced_url=public_url,
            mode="enhance",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        print(f"Tool Critical Failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/remove-bg")
@router.post("/remove-bg/")
async def remove_bg(user_id: str, file: UploadFile = File(...)):
    """
    Background Remover using Replicate (lucataco/remove-bg).
    """
    try:
        contents = await file.read()
        
        # 1. Upload original
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        raw_url = raw_res.get("image_url")
        
        # 2. Process via Replicate
        rep_result = await replicate_enhance(
            image_url=raw_url,
            mode="remove_bg", 
            scale=1
        )
        ephemeral_url = rep_result.get("enhanced_url")
        
        # 3. Upload to Cloudinary for permanent storage
        final_res = await cloudinary_service.upload_from_url(url=ephemeral_url)
        public_url = final_res.get("image_url")
        
        # 4. Save History
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=raw_url,
            enhanced_url=public_url,
            mode="remove-bg",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        print(f"RemBG Tool Failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))
