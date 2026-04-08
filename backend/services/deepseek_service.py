import os
import httpx
from dotenv import load_dotenv

load_dotenv()

# Migrated to OpenAI via OpenRouter
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

async def prompt_deepseek(prompt: str, system_prompt: str = "You are the OpenAI GPT Archon, an expert in image engineering and professional photography.") -> str:
    """
    Interface with OpenAI (via OpenRouter) for Forge Intelligence.
    Using 'prompt_deepseek' name for compatibility with existing imports.
    """
    if not OPENAI_API_KEY:
        return "OpenAI Intelligence Offline (Key Missing)"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{OPENROUTER_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173", # Required by OpenRouter
                    "X-Title": "Pixel Forge AI"
                },
                json={
                    "model": "openai/gpt-4o-mini", # High Speed / High intelligence for professional work
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    "stream": False
                },
                timeout=30.0
            )
            
            # Detailed Error Handling
            if response.status_code == 401:
                return "OpenAI Intelligence Error: Unauthorized (Invalid API Key)"
            elif response.status_code == 402:
                return "OpenAI Intelligence Error: Insufficient Credits"
            elif response.status_code == 429:
                return "OpenAI Intelligence Error: Rate Limit Exceeded"
            elif response.status_code >= 500:
                return "OpenAI Intelligence Error: Neural Server Overloaded (500+)"
                
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
            
        except httpx.ConnectError:
            return "OpenAI Intelligence Error: Connection Failed (Network Issue)"
        except Exception as e:
            print(f"OpenAI Intelligence Error: {e}")
            return f"OpenAI Intelligence Error: Synchronization Failed ({type(e).__name__})"

async def suggest_params(user_intent: str) -> dict:
    """
    Use OpenAI to intelligently select Forge parameters.
    """
    prompt = f"""
    Analyze the following user intent for image enhancement:
    "{user_intent}"
    
    Choose the best Mode and Scale.
    Modes available: auto, portrait, landscape, low_light, remove_bg, denoise.
    Scales available: 2, 4, 8.
    
    Return ONLY a JSON object in this format:
    {{"mode": "mode_string", "scale": scale_int, "explanation": "brief_reasoning"}}
    """
    
    response = await prompt_deepseek(prompt)
    try:
        import json
        start = response.find('{')
        end = response.rfind('}') + 1
        return json.loads(response[start:end])
    except:
        return {"mode": "auto", "scale": 2, "explanation": "Defaulting to standard protocols."}
