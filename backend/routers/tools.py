from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import gemini_service, cloudinary_service, supabase_service
import base64
from io import BytesIO

router = APIRouter(prefix="/tools")

@router.post("/enhance/")
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

