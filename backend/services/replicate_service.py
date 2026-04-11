import replicate
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Replicate client
replicate_client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

async def enhance_image(image_url: str, mode: str, scale: int) -> dict:
    """
    Process image using Replicate cloud models.
    """
    print(f"Replicate Service: Enhancing {image_url} (Mode: {mode}, Scale: {scale}x)")
    
    try:
        # 1. Select Model based on Mode
        if mode == "remove_bg":
            # Latest lucataco/remove-bg
            output = replicate_client.run(
                "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
                input={"image": image_url}
            )
            enhanced_url = str(output)
            
        elif mode == "denoise" or mode == "low_light":
            # Latest sczhou/codeformer
            output = replicate_client.run(
                "sczhou/codeformer:cc4956dd26fa5a7185d5660cc9100fab1b8070a1d1654a8bb5eb6d443b020bb2",
                input={
                    "image": image_url,
                    "upscale": scale if scale > 1 else 1,
                    "face_upsample": True,
                    "background_enhance": True,
                    "codeformer_fidelity": 0.5
                }
            )
            enhanced_url = str(output)
            
        else:
            # Latest nightmareai/real-esrgan
            output = replicate_client.run(
                "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
                input={
                    "image": image_url,
                    "upscale": scale if scale > 1 else 2,
                }
            )
            enhanced_url = str(output)

        return {
            "enhanced_url": enhanced_url,
            "processing_time": 0.0 
        }
        
    except Exception as e:
        print(f"Replicate Error: {e}")
        raise Exception(f"Failed to enhance image via Replicate: {str(e)}")

async def generate_image(prompt: str) -> str:
    """
    Generate an image utilizing the ultra-premium SDXL models on Replicate.
    Returns direct URL string.
    """
    print(f"Replicate Service: Generating SDXL for prompt: {prompt}")
    try:
        # SDXL
        output = replicate_client.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5d1c712de7dfea535525255b1aa35c5565e08b",
            input={
                "prompt": prompt,
                "width": 1024,
                "height": 1024,
                "refine": "expert_ensemble_refiner",
                "apply_watermark": False,
                "num_inference_steps": 35
            }
        )
        # Replicate usually returns an array of URLs for SDXL. We pick the first.
        if isinstance(output, list) and len(output) > 0:
            return str(output[0])
        return str(output)
    except Exception as e:
        print(f"Replicate Generation Error: {e}")
        raise Exception(f"Failed to generate image via Replicate SDXL: {str(e)}")
