from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schemas import UploadResponse
from services import cloudinary_service

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/upload", response_model=UploadResponse)
async def upload_image(file: UploadFile = File(...)):
    """
    Upload an image to Cloudinary.
    Validates file type and size before uploading.
    """
    # Validate content type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="File type not supported. Please upload JPG, PNG, or WebP.",
        )

    # Read file and validate size
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 10MB.",
        )

    try:
        result = await cloudinary_service.upload_image(
            file_bytes, file.filename
        )
        return UploadResponse(
            image_url=result["image_url"],
            public_id=result["public_id"],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
