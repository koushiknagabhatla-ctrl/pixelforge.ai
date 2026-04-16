import httpx
import os
import base64
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class SegmindService:
    def __init__(self):
        self.api_key = os.getenv("SEGMIND_API_KEY")
        self.base_url = "https://api.segmind.com/v1"

    async def generate_image(self, prompt: str) -> Optional[bytes]:
        """
        Generates a high-fidelity image using the latest Flux 1.1 Pro model.
        """
        url = f"{self.base_url}/flux-1.1-pro"
        payload = {
            "prompt": prompt,
            "seed": -1,
            "width": 1024,
            "height": 1024,
            "prompt_upsampling": True
        }
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, json=payload, headers=headers, timeout=60.0)
                if response.status_code == 200:
                    return response.content
                else:
                    print(f"SEGMIND CRITICAL ERROR [{response.status_code}]: {response.text}")
                    return None
            except Exception as e:
                print(f"SEGMIND CONNECTION FAILURE: {str(e)}")
                return None

    async def enhance_image(self, image_bytes: bytes) -> Optional[bytes]:
        """
        Enhances an image using the Flux2-Klein protocol.
        """
        # Sanitizing model ID naming convention for Segmind API
        model_id = "flux2-klein-9b-enhanced-details"
        url = f"{self.base_url}/{model_id}"
        
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        payload = {
            "image": base64_image,
            "prompt": "highly detailed, 8k, realistic, sharp focus, professional photography",
            "strength": 0.35,
            "steps": 25,
            "seed": -1,
            "sampler": "euler",
            "guidance_scale": 7.5
        }
        
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, json=payload, headers=headers, timeout=120.0)
                if response.status_code == 200:
                    return response.content
                else:
                    print(f"SEGMIND ENHANCE ERROR [{response.status_code}]: {response.text}")
                    return None
            except Exception as e:
                print(f"SEGMIND ENHANCE FAILURE: {str(e)}")
                return None

    async def remove_background(self, image_bytes: bytes) -> Optional[bytes]:
        """
        Extracts subjects using Segmind's native background removal.
        """
        url = f"{self.base_url}/bg-removal"
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        payload = {
            "image": base64_image
        }
        
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, json=payload, headers=headers, timeout=120.0)
                if response.status_code == 200:
                    return response.content
                else:
                    print(f"SEGMIND BG ERROR [{response.status_code}]: {response.text}")
                    return None
            except Exception as e:
                print(f"SEGMIND BG FAILURE: {str(e)}")
                return None

segmind_service = SegmindService()
