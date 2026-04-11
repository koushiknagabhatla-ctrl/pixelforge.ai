from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import cloudinary_service, supabase_service, segmind_service

router = APIRouter(prefix="/tools")

@router.post("/enhance")
@router.post("/enhance/")
async def enhance(user_id: str, file: UploadFile = File(...)):
    """
    Enhanced Image Processor.
    Utilizes Replicate API and Cloudinary uploads.
    """
    try:
        contents = await file.read()
        
        from backend.services import replicate_service
        
        # 1. Cloudinary upload FIRST (Replicate requires a standard URL)
        upload_result = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{file.filename}"
        )
        raw_url = upload_result.get("image_url")
        if not raw_url:
            raise HTTPException(status_code=500, detail="Cloudinary upload boundary failure.")

        # 2. Enhance using Replicate (RealESRGAN)
        rep_result = await replicate_service.enhance_image(
            image_url=raw_url,
            mode="enhance", 
            scale=2
        )
        public_url = rep_result.get("enhanced_url")
        if not public_url:
             raise HTTPException(status_code=500, detail="Replicate upscaler processing failed.")
        
        # 3. Neural Archive Synchronization
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=file.filename,
            enhanced_url=public_url,
            mode="enhance",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        print(f"Tool Critical Failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))
