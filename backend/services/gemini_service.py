import os
import google.generativeai as genai
from PIL import Image
from io import BytesIO
import asyncio

# Master System Instruction for Prompt Engineering
PROMPT_OPTIMIZER_INSTRUCTION = (
    "You are an expert AI image prompt engineer. Take the user's basic prompt and expand it into "
    "a highly detailed, vivid image generation prompt. Add lighting, style, mood, camera angle, "
    "color palette, and quality tags. Output only the enhanced prompt, nothing else."
)

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("WARNING: GEMINI_API_KEY not found in environment.")
        genai.configure(api_key=api_key)
        
        # Models initialization
        self.optimizer_model = genai.GenerativeModel("gemini-1.5-flash")
        # Note: Imagen 3 availability via SDK is model-dependent. Defaulting to standard GenAI Image Gen.
        # Ensure the GEMINI_API_KEY has access to Imagen.
        self.image_model = genai.GenerativeModel("imagen-3.0-generate-001")

    async def optimize_prompt(self, user_prompt: str) -> str:
        """
        Enhances a basic user prompt into a professional, descriptive one using Gemini Flash.
        """
        try:
            response = self.optimizer_model.generate_content(
                f"{PROMPT_OPTIMIZER_INSTRUCTION}\n\nUser Input: {user_prompt}"
            )
            enhanced = response.text.strip()
            return enhanced if enhanced else user_prompt
        except Exception as e:
            print(f"Prompt Optimization Error: {e}")
            return user_prompt

    async def generate_image(self, prompt: str) -> bytes:
        """
        Generates an image using Imagen 3 via the Gemini SDK.
        Returns raw image bytes.
        """
        # Enhance prompt first
        enhanced_prompt = await self.optimize_prompt(prompt)
        print(f"Forging Enhanced Prompt: {enhanced_prompt}")

        try:
            # Generate image
            # Note: SDK syntax for Image Gen can vary. Using latest GenAI Image pattern.
            result = self.image_model.generate_content(enhanced_prompt)
            
            # Extract image from response (Imagen 3 on GenAI handles this via specialized parts)
            for part in result.candidates[0].content.parts:
                if part.inline_data:
                    return part.inline_data.data
            
            raise Exception("No image data found in Gemini response.")

        except Exception as e:
            print(f"Gemini Generation Error: {e}")
            raise e

gemini_service = GeminiService()
