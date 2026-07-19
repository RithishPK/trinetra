from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
from typing import Optional

router = APIRouter()

def get_supabase():
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    return create_client(url, key)

class ScamReport(BaseModel):
    scam_type: str
    description: str
    city: Optional[str] = None
    state: Optional[str] = None
    verdict: Optional[str] = None
    risk_score: Optional[int] = None
    case_id: Optional[str] = None

@router.post("/report")
async def submit_report(report: ScamReport):
    try:
        supabase = get_supabase()
        data = supabase.table("scam_reports").insert({
            "scam_type": report.scam_type,
            "description": report.description,
            "city": report.city,
            "state": report.state,
            "verdict": report.verdict,
            "risk_score": report.risk_score,
            "case_id": report.case_id
        }).execute()
        return {"success": True, "message": "Report submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/feed")
async def get_feed():
    try:
        supabase = get_supabase()
        data = supabase.table("scam_reports").select("*").order("reported_at", desc=True).limit(20).execute()
        return {"reports": data.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))