import requests
import json

api_key = "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"
url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = {
    "prompt": "A steampunk flying machine",
    "cfg_scale": 5,
    "seed": 0,
    "steps": 25
}

response = requests.post(url, headers=headers, json=payload)
print(f"Status: {response.status_code}")
print(f"Data: {response.text[:200]}")
