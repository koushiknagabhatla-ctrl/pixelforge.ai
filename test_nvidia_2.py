import os
import requests
import json

api_key = "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"
url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl-base-1.0" # or stable-diffusion-3.5-large

headers = {
    "Authorization": f"Bearer {api_key}",
    "Accept": "application/json"
}

payload = {
  "text_prompts": [
    {
      "text": "A steampunk flying machine",
      "weight": 1
    }
  ],
  "cfg_scale": 5,
  "sampler": "K_DPM_2_ANCESTRAL",
  "seed": 0,
  "steps": 25
}


print("Testing Image Generation with SDXL...")
response = requests.post(url, headers=headers, json=payload)
print(f"Status: {response.status_code}")
try:
    data = response.json()
    if 'artifacts' in data:
        print("Success: Image artifacts received.")
    else:
        print("Response:", list(data.keys()))
except Exception as e:
    print(f"Response: {response.text}")
    print(e)
