from fastapi import APIRouter, UploadFile, File, HTTPException
from services import gemini_service, cloudinary_service, supabase_service
import base64
from io import BytesIO

router = APIRouter(prefix="/api/tools", tags=["tools"])

@router.post("/bg-remove")
async def bg_remove(user_id: str, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        processed_bytes = await gemini_service.remove_background(contents)
        
        # Upload to Cloudinary and return URL
        upload_result = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"bg_removed_{user_id}_{file.filename}"
        )
        public_url = upload_result.get("image_url")
        
        # Save to history
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=file.filename,
            enhanced_url=public_url,
            mode="bg_remove",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/enhance")
async def enhance(user_id: str, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        processed_bytes = await gemini_service.enhance_image(contents)
        
        upload_result = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"enhanced_{user_id}_{file.filename}"
        )
        public_url = upload_result.get("image_url")
        
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=file.filename,
            enhanced_url=public_url,
            mode="enhance",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/denoise")
async def denoise(user_id: str, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        processed_bytes = await gemini_service.denoise_image(contents)
        
        upload_result = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"denoised_{user_id}_{file.filename}"
        )
        public_url = upload_result.get("image_url")
        
        await supabase_service.save_enhancement(
            user_id=user_id,
            original_url=file.filename,
            enhanced_url=public_url,
            mode="denoise",
            scale=1
        )
        
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
