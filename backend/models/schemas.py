from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EnhanceRequest(BaseModel):
    image_url: str
    mode: str  # auto, portrait, landscape, old_photo, low_light, remove_bg, denoise
    scale: int = 2  # 2, 4, or 8
    user_id: str


class EnhanceResponse(BaseModel):
    enhanced_url: str
    original_url: str
    processing_time: float
    mode: str
    scale: int


class UploadResponse(BaseModel):
    image_url: str
    public_id: str


class UserCredits(BaseModel):
    credits: int
    plan: str


class EnhancementRecord(BaseModel):
    id: str
    user_id: str
    original_url: str
    enhanced_url: str
    mode: str
    scale: int
    created_at: str



