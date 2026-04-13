import requests

api_key = "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"
headers = {"Authorization": f"Bearer {api_key}", "Accept": "application/json"}
print("Fetching models...")
response = requests.get("https://integrate.api.nvidia.com/v1/models", headers=headers)
print(f"Status: {response.status_code}")
try:
    for m in response.json()['data']:
        print(m['id'])
except Exception as e:
    print(response.text)
