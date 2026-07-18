from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
from prompts.message_fraud_prompt import MESSAGE_FRAUD_PROMPT

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/analyze")
async def analyze_message_fraud(input: TextInput):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    if not input.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty")
    if len(input.text) > 5000:
        raise HTTPException(status_code=400, detail="Text too long. Maximum 5000 characters.")
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": MESSAGE_FRAUD_PROMPT},
                {"role": "user", "content": "Analyse this message:\n\n" + input.text}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        raw = response.choices[0].message.content.strip()
        result = json.loads(raw)

        score = result.get("risk_score", 0)
        if score <= 20:
            result["verdict"] = "SAFE"
        elif score <= 65:
            result["verdict"] = "SUSPICIOUS"
        elif score <= 85:
            result["verdict"] = "LIKELY_SCAM"
        else:
            result["verdict"] = "DEFINITE_SCAM"

        if result.get("data_harvesting_detected") or result.get("payment_requested"):
            if result.get("report_to") == "not_required":
                result["report_to"] = "cybercrime.gov.in"

        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model returned invalid JSON. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))