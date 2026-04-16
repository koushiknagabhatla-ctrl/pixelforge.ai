import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

class StabilityService:
    def __init__(self):
        self.api_key = os.getenv("STABILITY_API_KEY")

    async def enhance_image(self, image_bytes: bytes) -> bytes:
        """
        Enhance an image using Stability AI's conservative upscaler for maximum 4K potential without size restrictions.
        """
        if not self.api_key:
            raise HTTPException(status_code=500, detail="STABILITY_API_KEY is not configured.")

        url = "https://api.stability.ai/v2beta/stable-image/upscale/conservative"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "image/*"
        }
        
        files = {
            "image": ("image.png", image_bytes, "image/png")
        }
        data = {
            "prompt": "breathtaking quality, sharp focus, perfectly clear, 8k resolution, raw photo, masterful execution",
            "output_format": "webp"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=headers, files=files, data=data, timeout=120.0)
                if response.status_code == 200:
                    return response.content
                else:
                    error_msg = f"Stability API Error ({response.status_code}): {response.text}"
                    print(error_msg)
                    raise HTTPException(status_code=response.status_code, detail=error_msg)
            except HTTPException:
                raise
            except Exception as e:
                print(f"STABILITY AI EXCEPTION: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Stability Runtime Error: {str(e)}")

    async def remove_background(self, image_bytes: bytes) -> bytes:
        """
        Extracts subjects using Stability AI's official high-resolution background removal model.
        This provides raw, full-quality cutouts without arbitrary downscaling.
        """
        if not self.api_key:
            raise HTTPException(status_code=500, detail="STABILITY_API_KEY is not configured.")

        url = "https://api.stability.ai/v2beta/stable-image/edit/remove-background"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "image/*"
        }
        
        files = {
            "image": ("image.png", image_bytes, "image/png")
        }
        data = {
            "output_format": "webp"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=headers, files=files, data=data, timeout=120.0)
                if response.status_code == 200:
                    return response.content
                else:
                    error_msg = f"Stability API Error ({response.status_code}): {response.text}"
                    print(error_msg)
                    raise HTTPException(status_code=response.status_code, detail=error_msg)
            except HTTPException:
                raise
            except Exception as e:
                print(f"STABILITY AI EXCEPTION: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Stability Runtime Error: {str(e)}")

stability_service = StabilityService()
