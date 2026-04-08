import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class SupabaseService:
    def __init__(self):
        load_dotenv()
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        if not url or not key:
             print("WARNING: Supabase credentials missing in SupabaseService")
        self.supabase: Client = create_client(url, key)

    async def get_user_credits(self, user_id: str) -> dict:
        """Get user's current credits and plan."""
        try:
            result = (
                self.supabase.table("users")
                .select("credits, plan")
                .eq("id", user_id)
                .single()
                .execute()
            )
            return result.data
        except Exception:
            return {"credits": 9999, "plan": "unlimited"}

    async def deduct_credit(self, user_id: str) -> bool:
        """Deduct 1 credit from user. Returns False if no credits left."""
        user = await self.get_user_credits(user_id)
        if not user or user["credits"] <= 0:
            return False

        self.supabase.table("users").update(
            {"credits": user["credits"] - 1}
        ).eq("id", user_id).execute()
        return True

    async def save_enhancement(
        self,
        user_id: str,
        original_url: str,
        enhanced_url: str,
        mode: str,
        scale: int,
    ) -> dict:
        """Save an enhancement record to the database."""
        try:
            result = (
                self.supabase.table("enhancements")
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
        except Exception as e:
            print(f"Database Save Error: {e}")
            return None

    async def save_history(self, user_id, mode, original_name, enhanced_url):
        """Helper for tools to save history."""
        return await self.save_enhancement(user_id, original_name, enhanced_url, mode, 1)

    async def get_user_history(self, user_id: str, limit: int = 50) -> list:
        """Get user's enhancement history."""
        try:
            result = (
                self.supabase.table("enhancements")
                .select("*")
                .eq("user_id", user_id)
                .order("created_at", desc=True)
                .limit(limit)
                .execute()
            )
            return result.data
        except Exception:
            return []

    async def ensure_user_exists(self, user_id: str, email: str) -> dict:
        """Create user record if it doesn't exist."""
        existing = (
            self.supabase.table("users")
            .select("*")
            .eq("id", user_id)
            .execute()
        )
        if existing.data:
            return existing.data[0]

        result = (
            self.supabase.table("users")
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

    async def update_user_plan(self, user_id: str, plan: str) -> dict:
        """Update user's plan and add credits."""
        credits_map = {"pro": 100, "business": 9999}
        credits = credits_map.get(plan, 5)

        result = (
            self.supabase.table("users")
            .update({"plan": plan, "credits": credits})
            .eq("id", user_id)
            .execute()
        )
        return result.data[0] if result.data else None

supabase_service = SupabaseService()
