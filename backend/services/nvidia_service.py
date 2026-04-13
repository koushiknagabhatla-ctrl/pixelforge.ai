import os
import httpx
import base64
import uuid
from fastapi import HTTPException
from dotenv import load_dotenv
from backend.services.cloudinary_service import cloudinary_service

load_dotenv()

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

class NvidiaService:
    async def generate_image(self, prompt: str) -> str:
        """
        Generates an image using NVIDIA NIM API (Stable Diffusion 3 Medium).
        Returns a permanently hosted Cloudinary image URL.
        """
        key = NVIDIA_API_KEY or os.getenv("NVIDIA_API_KEY")
        if not key:
            raise HTTPException(status_code=500, detail="NVIDIA_API_KEY not configured in environment variables.")

        url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium"
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        payload = {
            "prompt": prompt,
            "cfg_scale": 5,
            "seed": 0,
            "steps": 25
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=headers, json=payload, timeout=60.0)
                response.raise_for_status()
                data = response.json()
                
                if "image" in data:
                    b64_str = data["image"]
                    file_bytes = base64.b64decode(b64_str)
                    
                    # Upload to Cloudinary for permanent storage
                    filename = f"nim-{uuid.uuid4().hex}.jpg"
                    upload_res = await cloudinary_service.upload_image(file_bytes, filename)
                    return upload_res["image_url"]
                    
                raise HTTPException(status_code=500, detail="Invalid response format from NVIDIA API")
            except httpx.HTTPStatusError as e:
                print(f"NVIDIA API Error: {e.response.text}")
                raise HTTPException(status_code=e.response.status_code, detail="NVIDIA API Generation Failed")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Generation Error: {str(e)}")

nvidia_service = NvidiaService()
