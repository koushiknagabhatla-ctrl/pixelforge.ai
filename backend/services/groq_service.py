import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class GroqService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.client = None
        if self.api_key:
            self.client = Groq(api_key=self.api_key)

    async def chat(self, message: str, system_prompt: str, model_name: str = "llama-3.3-70b-versatile") -> str:
        """
        High-velocity chat completion using Groq LPUs.
        Defaults to Llama 3.3 70B for 'God Like' performance.
        """
        if not self.client:
            return "Groq Service is not initialized. Please check GROQ_API_KEY."

        try:
            # We use the standard OpenAI-compatible messages format
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": message,
                    }
                ],
                model=model_name,
                temperature=0.7,
                max_tokens=2048,
                top_p=1,
                stop=None,
                stream=False,
            )
            return chat_completion.choices[0].message.content.strip()
        except Exception as e:
            print(f"Groq Neural Collision: {e}")
            raise e

groq_service = GroqService()
