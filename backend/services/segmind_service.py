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
        Generates a high-fidelity image using the Flux Pro model on Segmind.
        """
        url = f"{self.base_url}/flux-pro"
        payload = {
            "prompt": prompt,
            "steps": 25,
            "seed": -1,
            "sampler": "euler",
            "guidance_scale": 7.5,
            "width": 1024,
            "height": 1024
        }
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=60.0)
            if response.status_code == 200:
                return response.content
            else:
                print(f"Segmind Generation Error: {response.text}")
                return None

    async def enhance_image(self, image_bytes: bytes) -> Optional[bytes]:
        """
        Enhances an image using the Flux2-Klein-9B-Enhanced-Details model via Segmind.
        """
        # Note: If Segmind requires a specific endpoint for custom models or img2img enhancement
        # I'll use the general 'image-to-image' logic or the specific model endpoint if known.
        # Given the model 'dx8152/Flux2-Klein-9B-Enhanced-Details', I'll target the model-specific endpoint.
        model_id = "dx8152/flux2-klein-9b-enhanced-details"
        url = f"{self.base_url}/{model_id}"
        
        # Base64 encode the image for JSON payload
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        payload = {
            "image": base64_image,
            "prompt": "highly detailed, 8k, realistic, sharp focus, professional photography",
            "strength": 0.5,
            "steps": 30,
            "seed": -1,
            "sampler": "euler",
            "guidance_scale": 7.5
        }
        
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=120.0)
            if response.status_code == 200:
                return response.content
            else:
                print(f"Segmind Enhancement Error: {response.text}")
                return None

segmind_service = SegmindService()
