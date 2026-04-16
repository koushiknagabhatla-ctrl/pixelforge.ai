from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import cloudinary_service, supabase_service
from backend.services.stability_service import stability_service
import uuid

router = APIRouter()

@router.post("/enhance")
@router.post("/enhance/")
async def enhance(user_id: str, file: UploadFile = File(...)):
    """
    Enhanced Image Processor using Stability AI natively at maximum potential (Conservative).
    """
    try:
        contents = await file.read()
        
        # 1. Expand image to peak fidelity using Stability High-Res Server
        enhanced_bytes = await stability_service.enhance_image(contents)
        
        # 2. Upload original and result to Cloudinary for permanent access
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        
        enh_res = await cloudinary_service.upload_image(
            file_bytes=enhanced_bytes,
            filename=f"enh_{user_id}_{uuid.uuid4().hex[:6]}.webp"
        )
        
        # 3. Save History
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=raw_res.get("image_url"),
            enhanced_url=enh_res.get("image_url"),
            mode="enhance",
            scale=1
        )
        
        return {"url": enh_res.get("image_url")}
    except Exception as e:
        print(f"Tool Critical Failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/remove-bg")
@router.post("/remove-bg/")
async def remove_bg(user_id: str, file: UploadFile = File(...)):
    """
    Background Remover using Stability AI's official extraction model for zero-loss transparency.
    """
    try:
        contents = await file.read()
        
        # 1. Process via Stability natively
        processed_bytes = await stability_service.remove_background(contents)
        
        # 2. Upload to Cloudinary (raw and webp cutout)
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        
        enh_res = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"nobg_{user_id}_{uuid.uuid4().hex[:6]}.webp"
        )
        
        # 3. Save History
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=raw_res.get("image_url"),
            enhanced_url=enh_res.get("image_url"),
            mode="remove-bg",
            scale=1
        )
        
        return {"url": enh_res.get("image_url")}
    except Exception as e:
        print(f"RemBG Tool Failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))
