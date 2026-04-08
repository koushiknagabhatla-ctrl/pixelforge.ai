import os
import httpx
from dotenv import load_dotenv

load_dotenv()

# Migrated to OpenAI via OpenRouter
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

class DeepSeekService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.base_url = "https://openrouter.ai/api/v1"

    async def prompt_deepseek(self, prompt: str, system_prompt: str = "You are the OpenAI GPT Archon, an expert in image engineering and professional photography.") -> str:
        """
        Interface with OpenAI (via OpenRouter) for Forge Intelligence.
        """
        if not self.api_key:
            return "OpenAI Intelligence Offline (Key Missing)"

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:5173",
                        "X-Title": "Pixel Forge AI"
                    },
                    json={
                        "model": "openai/gpt-4o-mini",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": prompt}
                        ],
                        "stream": False
                    },
                    timeout=30.0
                )
                
                if response.status_code == 401:
                    return "OpenAI Intelligence Error: Unauthorized"
                elif response.status_code == 402:
                    return "OpenAI Intelligence Error: Insufficient Credits"
                elif response.status_code == 429:
                    return "OpenAI Intelligence Error: Rate Limit Exceeded"
                
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
            except Exception as e:
                print(f"OpenAI Intelligence Error: {e}")
                return f"OpenAI Intelligence Error: Synchronization Failed"

    async def suggest_params(self, user_intent: str) -> dict:
        """
        Use OpenAI to intelligently select Forge parameters.
        """
        prompt = f"""
        Analyze user intent: "{user_intent}"
        Return ONLY a JSON object: {{"mode": "mode", "scale": scale, "explanation": "..."}}
        """
        response = await self.prompt_deepseek(prompt)
        try:
            import json
            start = response.find('{')
            end = response.rfind('}') + 1
            return json.loads(response[start:end])
        except:
            return {"mode": "auto", "scale": 2, "explanation": "Defaulting to standard protocols."}

deepseek_service = DeepSeekService()
