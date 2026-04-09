from fastapi import APIRouter, HTTPException
from backend.models.schemas import (
    UserCredits,
    EnhancementRecord,
)
from backend.services.supabase_service import supabase_service
from typing import List
import uuid

router = APIRouter()


@router.get("/credits/{user_id}/", response_model=UserCredits)
async def get_credits(user_id: str):
    """Get user's current credits and plan."""
    try:
        data = await supabase_service.get_user_credits(user_id)
        return UserCredits(credits=data.get("credits", 0), plan=data.get("plan", "free"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Retrieval Failed: {str(e)}")


@router.get("/history/{user_id}/", response_model=List[EnhancementRecord])
async def get_history(user_id: str, limit: int = 50):
    """Get user's enhancement history."""
    history = await supabase_service.get_user_history(user_id, limit)
    return [
        EnhancementRecord(
            id=record["id"],
            user_id=record["user_id"],
            original_url=record["original_url"],
            enhanced_url=record["enhanced_url"],
            mode=record["mode"],
            scale=record["scale"],
            created_at=record["created_at"],
        )
        for record in history
    ]


@router.post("/user/ensure/")
async def ensure_user(user_id: str, email: str):
    """Ensure user exists in database (called after Supabase auth)."""
    try:
        user = await supabase_service.ensure_user_exists(user_id, email)
        if not user:
            raise HTTPException(status_code=503, detail="Database Initialization Failed: User could not be synchronized.")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"User Synchronization Crisis: {str(e)}")



