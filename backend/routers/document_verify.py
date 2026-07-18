from fastapi import APIRouter, HTTPException, UploadFile, File
import pdfplumber
from groq import Groq
import os
import json
import io
from prompts.document_verify_prompt import DOCUMENT_VERIFY_PROMPT

router = APIRouter()

@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        contents = await file.read()
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF. File may be scanned or image-based.")
        if len(text) > 6000:
            text = text[:6000]
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": DOCUMENT_VERIFY_PROMPT},
                {"role": "user", "content": f"Analyse this document text:\n\n{text}"}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        raw = response.choices[0].message.content.strip()
        result = json.loads(raw)
        score = result.get("risk_score", 0)
        if score <= 25:
            result["verdict"] = "LIKELY_LEGITIMATE"
        elif score <= 50:
            result["verdict"] = "SUSPICIOUS"
        elif score <= 75:
            result["verdict"] = "LIKELY_FRAUDULENT"
        else:
            result["verdict"] = "CONFIRMED_FRAUDULENT"
        return result
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model returned invalid JSON. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))