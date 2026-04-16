from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services import cloudinary_service, supabase_service
from backend.services.stability_service import stability_service
from backend.services.segmind_service import segmind_service
import uuid

router = APIRouter()

@router.post("/enhance")
@router.post("/enhance/")
async def enhance(user_id: str, file: UploadFile = File(...)):
    """
    Enhanced Image Processor using Universal Fallback Routing.
    Tries Stability AI -> Falls back to Segmind.
    """
    try:
        contents = await file.read()
        enhanced_bytes = None
        
        # 1. Attempt Primary Node (Stability AI)
        try:
            enhanced_bytes = await stability_service.enhance_image(contents)
            print("Successfully processed via Stability AI.")
        except Exception as e:
            print(f"Stability Enhancement Failed (Likely 402/Credits): {e}")
            print("Routing to Backup High-Fidelity Node (Segmind)...")
            # 2. Attempt Fallback Node (Segmind)
            try:
                enhanced_bytes = await segmind_service.enhance_image(contents)
                if not enhanced_bytes:
                    raise Exception("Segmind returned empty buffer.")
            except Exception as segError:
                print(f"Segmind Fallback Failed: {segError}")
                raise Exception("Both Stability AI and Segmind nodes failed.")

        # 3. Upload to Cloudinary
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        
        enh_res = await cloudinary_service.upload_image(
            file_bytes=enhanced_bytes,
            filename=f"enh_{user_id}_{uuid.uuid4().hex[:6]}.webp"
        )
        
        # 4. Save History
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
    Background Remover using Universal Fallback Routing.
    Tries Stability AI -> Falls back to Segmind.
    """
    try:
        contents = await file.read()
        processed_bytes = None
        
        # 1. Attempt Primary Node (Stability AI)
        try:
            processed_bytes = await stability_service.remove_background(contents)
            print("Successfully processed via Stability AI.")
        except Exception as e:
            print(f"Stability Background Removal Failed (Likely 402/Credits): {e}")
            print("Routing to Backup High-Fidelity Node (Segmind)...")
            # 2. Attempt Fallback Node (Segmind)
            try:
                processed_bytes = await segmind_service.remove_background(contents)
                if not processed_bytes:
                    raise Exception("Segmind returned empty buffer.")
            except Exception as segError:
                print(f"Segmind Fallback Failed: {segError}")
                raise Exception("Both Stability AI and Segmind nodes failed to remove background.")

        # 3. Upload to Cloudinary
        raw_res = await cloudinary_service.upload_image(
            file_bytes=contents,
            filename=f"raw_{user_id}_{uuid.uuid4().hex[:6]}.jpg"
        )
        
        enh_res = await cloudinary_service.upload_image(
            file_bytes=processed_bytes,
            filename=f"nobg_{user_id}_{uuid.uuid4().hex[:6]}.webp"
        )
        
        # 4. Save History
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
