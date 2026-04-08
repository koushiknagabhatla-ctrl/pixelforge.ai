import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY"),
)


async def get_user_credits(user_id: str) -> dict:
    """Get user's current credits and plan."""
    try:
        result = (
            supabase.table("users")
            .select("credits, plan")
            .eq("id", user_id)
            .single()
            .execute()
        )
        return result.data
    except Exception:
        # Fallback for unlimited personal use or missing DB trigger
        return {"credits": 9999, "plan": "unlimited"}

async def deduct_credit(user_id: str) -> bool:
    """Deduct 1 credit from user. Returns False if no credits left."""
    user = await get_user_credits(user_id)
    if not user or user["credits"] <= 0:
        return False

    supabase.table("users").update(
        {"credits": user["credits"] - 1}
    ).eq("id", user_id).execute()
    return True


async def save_enhancement(
    user_id: str,
    original_url: str,
    enhanced_url: str,
    mode: str,
    scale: int,
) -> dict:
    """Save an enhancement record to the database."""
    try:
        result = (
            supabase.table("enhancements")
            .insert(
                {
                    "user_id": user_id,
                    "original_url": original_url,
                    "enhanced_url": enhanced_url,
                    "mode": mode,
                    "scale": scale,
                }
            )
            .execute()
        )
        return result.data[0] if result.data else None
    except Exception:
        # Prevent crash if enhancements table doesn't exist yet
        return None


async def get_user_history(user_id: str, limit: int = 50) -> list:
    """Get user's enhancement history."""
    try:
        result = (
            supabase.table("enhancements")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data
    except Exception:
        return []


async def ensure_user_exists(user_id: str, email: str) -> dict:
    """Create user record if it doesn't exist (called after auth)."""
    existing = (
        supabase.table("users")
        .select("*")
        .eq("id", user_id)
        .execute()
    )
    if existing.data:
        return existing.data[0]

    result = (
        supabase.table("users")
        .insert(
            {
                "id": user_id,
                "email": email,
                "credits": 5,
                "plan": "free",
            }
        )
        .execute()
    )
    return result.data[0] if result.data else None


async def update_user_plan(user_id: str, plan: str) -> dict:
    """Update user's plan and add credits."""
    credits_map = {
        "pro": 100,
        "business": 9999,
    }
    credits = credits_map.get(plan, 5)

    result = (
        supabase.table("users")
        .update({"plan": plan, "credits": credits})
        .eq("id", user_id)
        .execute()
    )
    return result.data[0] if result.data else None
