from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
import uuid
from datetime import datetime
from prompts.digital_arrest_prompt import DIGITAL_ARREST_PROMPT

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/analyze")
async def analyze_digital_arrest(input: TextInput):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    if not input.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty")
    if len(input.text) > 5000:
        raise HTTPException(status_code=400, detail="Text too long. Maximum 5000 characters.")
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": DIGITAL_ARREST_PROMPT},
                {"role": "user", "content": "Analyse this text:\n\n" + input.text}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        raw = response.choices[0].message.content.strip()
        result = json.loads(raw)

        score = result.get("risk_score", 0)
        if score <= 20:
            result["verdict"] = "SAFE"
        elif score <= 45:
            result["verdict"] = "LOW_RISK"
        elif score <= 70:
            result["verdict"] = "MODERATE_RISK"
        elif score <= 89:
            result["verdict"] = "HIGH_RISK"
        else:
            result["verdict"] = "CONFIRMED_SCAM"

        result["case_id"] = "TRI-" + str(uuid.uuid4())[:8].upper()
        result["analyzed_at"] = datetime.utcnow().isoformat() + "Z"
        result["platform"] = "Trinetra v1.0"

        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model returned invalid JSON. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))