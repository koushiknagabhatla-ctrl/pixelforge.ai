import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

class CloudinaryService:
    def __init__(self):
        load_dotenv()
        cloudinary.config(
            cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
            api_key=os.getenv("CLOUDINARY_API_KEY"),
            api_secret=os.getenv("CLOUDINARY_API_SECRET"),
            secure=True,
        )

    async def upload_image(self, file_bytes: bytes, filename: str) -> dict:
        """
        Upload an image to Cloudinary and return the URL and public_id.
        """
        try:
            result = cloudinary.uploader.upload(
                file_bytes,
                folder="pixelforge",
                public_id=filename.rsplit(".", 1)[0],
                resource_type="image",
                overwrite=True,
                transformation=[
                    {"quality": "auto", "fetch_format": "auto"}
                ],
            )
            return {
                "image_url": result["secure_url"],
                "public_id": result["public_id"],
            }
        except Exception as e:
            raise Exception(f"Upload failed: {str(e)}")

    async def upload_from_url(self, url: str, prefix: str = "enhanced") -> dict:
        """
        Upload an image from URL to Cloudinary for permanent storage.
        """
        try:
            result = cloudinary.uploader.upload(
                url,
                folder="pixelforge/enhanced",
                resource_type="image",
                overwrite=True,
                transformation=[
                    {"quality": "auto", "fetch_format": "auto"}
                ],
            )
            return {
                "image_url": result["secure_url"],
                "public_id": result["public_id"],
            }
        except Exception as e:
            raise Exception(f"Upload from URL failed: {str(e)}")

cloudinary_service = CloudinaryService()
