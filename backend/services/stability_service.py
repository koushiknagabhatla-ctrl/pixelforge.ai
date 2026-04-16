import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

class StabilityService:
    def __init__(self):
        self.api_key = os.getenv("STABILITY_API_KEY")
        self.base_url = "https://api.stability.ai/v2beta/stable-image/upscale/fast"

    async def enhance_image(self, image_bytes: bytes) -> bytes:
        """
        Enhance an image using Stability AI's fast upscaler.
        Returns the enhanced image bytes.
        """
        if not self.api_key:
            raise HTTPException(status_code=500, detail="STABILITY_API_KEY is not configured.")

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "image/*"
        }

        # Stability upscaler fast endpoint accepts 'image'
        files = {
            "image": ("image.png", image_bytes, "image/png")
        }
        
        data = {
            "output_format": "webp"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    files=files,
                    data=data,
                    timeout=120.0
                )
                
                if response.status_code == 200:
                    return response.content
                else:
                    print(f"STABILITY AI ERROR: {response.status_code} - {response.text}")
                    raise HTTPException(status_code=response.status_code, detail="Stability AI failed to enhance the image.")
            except Exception as e:
                print(f"STABILITY AI EXCEPTION: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Stability AI Enhancement Error: {str(e)}")

stability_service = StabilityService()
