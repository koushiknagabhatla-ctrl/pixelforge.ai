import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

class RembgService:
    def __init__(self):
        self.api_key = os.getenv("BG_REMOVER_API_KEY")
        self.base_url = "https://api.rembg.com/rmbg"

    async def remove_background(self, image_bytes: bytes) -> bytes:
        """
        Removes background from an image using RemBG API.
        Returns the transparent image bytes.
        """
        if not self.api_key:
            raise HTTPException(status_code=500, detail="BG_REMOVER_API_KEY is not configured.")

        # Both common conventions handled: x-api-key and Authorization
        headers = {
            "X-Api-Key": self.api_key,
            "Authorization": f"Bearer {self.api_key}"
        }

        files = {
            "image_file": ("image.png", image_bytes, "image/png"),
            "image": ("image.png", image_bytes, "image/png"),
            "file": ("image.png", image_bytes, "image/png")
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    files={"file": ("image.png", image_bytes, "image/png")}, # Standard fallback, but most UUID-based generic APIs use file or image
                    timeout=120.0
                )
                
                # If API expects 'image_file' instead
                if response.status_code >= 400:
                   response = await client.post(
                        self.base_url,
                        headers=headers,
                        files={"image": ("image.png", image_bytes, "image/png")},
                        timeout=120.0
                   )
                   
                if response.status_code >= 400:
                    response = await client.post(
                        self.base_url,
                        headers=headers,
                        files={"image_file": ("image.png", image_bytes, "image/png")},
                        timeout=120.0
                    )

                if response.status_code == 200:
                    return response.content
                else:
                    print(f"REMBG API ERROR: {response.status_code} - {response.text}")
                    raise HTTPException(status_code=response.status_code, detail="RemBG failed to remove background.")
            except Exception as e:
                print(f"REMBG API EXCEPTION: {str(e)}")
                raise HTTPException(status_code=500, detail=f"RemBG API Error: {str(e)}")

rembg_service = RembgService()
