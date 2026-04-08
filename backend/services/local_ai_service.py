import cv2
import numpy as np
import requests
from io import BytesIO
from PIL import Image
from rembg import remove
import os
import asyncio

def download_image(url):
    response = requests.get(url)
    return Image.open(BytesIO(response.content))

def pil_to_cv2(pil_image):
    return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

def cv2_to_bytes(cv2_image):
    # Pro Export: High-Quality JPEG (95%)
    _, buffer = cv2.imencode('.jpg', cv2_image, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
    return buffer.tobytes()

def adjust_gamma(image, gamma=1.0):
    invGamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** invGamma) * 255 for i in np.arange(0, 256)]).astype("uint8")
    return cv2.LUT(image, table)

def enhance_details_pyramid(img):
    layer = img.copy().astype(np.float32)
    gaussian = cv2.GaussianBlur(layer, (0, 0), 3)
    details = cv2.subtract(layer, gaussian)
    enhanced = cv2.add(layer, details * 0.5)
    return np.clip(enhanced, 0, 255).astype(np.uint8)

async def process_local(image_url: str, mode: str, scale: int, check_cancellation=None) -> bytes:
    """
    God-Tier Local AI Engine with Abort Protocol support.
    """
    print(f"Forge Engine: Processing {image_url} (Mode: {mode})")
    
    # 1. Acquisition
    pil_img = download_image(image_url)
    img = pil_to_cv2(pil_img)
    height, width = img.shape[:2]

    # Abort Check
    if check_cancellation and await check_cancellation():
        raise asyncio.CancelledError("Forge Aborted by Architect.")

    # Dimension Safety
    if (width * scale) > 4096 or (height * scale) > 4096:
        scale = min(scale, int(4096 / max(width, height)))
    
    # 2. Adaptive Balancing
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.2, tileGridSize=(8,8))
    cl = clahe.apply(l)
    img = cv2.merge((cl,a,b))
    img = cv2.cvtColor(img, cv2.COLOR_LAB2BGR)
    img = adjust_gamma(img, gamma=1.05)

    # Abort Check before heavy lifting
    if check_cancellation and await check_cancellation():
        raise asyncio.CancelledError("Forge Aborted during balancing.")

    # 3. Domain Specific Modulations
    if mode == "remove_bg":
        img_no_bg = remove(pil_img)
        img = cv2.cvtColor(np.array(img_no_bg), cv2.COLOR_RGBA2BGRA)
    elif mode == "portrait":
        img = cv2.bilateralFilter(img, 7, 40, 40)
    elif mode == "low_light":
        img = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)
        img = adjust_gamma(img, gamma=1.2)

    # 4. Neural Scaling (Multi-pass fallback)
    if scale > 1:
        img = cv2.resize(img, (width * scale, height * scale), interpolation=cv2.INTER_LANCZOS4)

    # Final Abort Check
    if check_cancellation and await check_cancellation():
        raise asyncio.CancelledError("Forge Aborted before finalization.")

    # 5. Pro Detail Phase
    img = enhance_details_pyramid(img)
    
    return cv2_to_bytes(img)
