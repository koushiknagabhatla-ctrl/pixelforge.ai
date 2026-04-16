import httpx

async def test():
    try:
        api_key = "6a3af9fd-7b34-4f8f-a9b0-ced0a19cc958"
        headers = {
            "X-Api-Key": api_key,
        }
        
        # Create a dummy image
        from PIL import Image
        import io
        img = Image.new('RGB', (100, 100), color = 'red')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        image_bytes = img_byte_arr.getvalue()

        async with httpx.AsyncClient() as client:
            resp = await client.post("https://api.rembg.com/rmbg", headers=headers, files={"image": ("test.png", image_bytes, "image/png")})
            print("STATUS:", resp.status_code)
            with open("test_output.png", "wb") as f:
                f.write(resp.content)
            print("Wrote test_output.png")
            print("Content-type:", resp.headers.get("content-type"))
            if b"error" in resp.content[:100]:
                print("BODY HAS ERROR:", resp.text)
    except Exception as e:
        print("ERROR:", e)

import asyncio
asyncio.run(test())
