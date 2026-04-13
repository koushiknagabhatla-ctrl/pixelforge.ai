import os
import requests
import json

api_key = "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"
url = "https://integrate.api.nvidia.com/v1/images/generations"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}
payload = {
    "model": "stabilityai/stable-diffusion-3-medium", # trying a different model just in case 3.5 large is 404
    "prompt": "Test image of a cat",
    "size": "1024x1024",
    "n": 1,
}

print("Testing Image Generation...")
response = requests.post(url, headers=headers, json=payload)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
