from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import cloudinary_service, supabase_service, segmind_service

router = APIRouter(prefix="/tools")

@router.post("/enhance")
@router.post("/enhance/")
async def enhance(user_id: str, file: UploadFile = File(...)):
    """
    Enhanced Image Processor v14.0.
    Utilizes the Flux2-Klein-9B-Enhanced-Details model via Segmind Neural Nexus.
    """
    try:
        contents = await file.read()
        
        # 1. Enhance using Segmind specialized model
        processed_bytes = await segmind_service.segmind_service.enhance_image(contents)
        if not processed_bytes:
             raise HTTPException(status_code=500, detail="Segmind Enhancement synchronization failed.")
        
        # 2. Synchronize with Cloudinary
        upload_result = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"enhanced_{user_id}_{file.filename}"
        )
        public_url = upload_result.get("image_url")
        
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
