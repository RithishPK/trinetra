from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import digital_arrest, message_fraud, document_verify
from routers import digital_arrest, message_fraud, document_verify, scam_report
load_dotenv()

app = FastAPI(
    title="Trinetra API",
    description="AI-Powered Digital Public Safety Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    digital_arrest.router,
    prefix="/api/digital-arrest",
    tags=["Digital Arrest Scam Detection"]
)

app.include_router(
    message_fraud.router,
    prefix="/api/message-fraud",
    tags=["Message Fraud Detection"]
)

app.include_router(
    document_verify.router,
    prefix="/api/document-verify",
    tags=["Document Verification"]
)

app.include_router(
    scam_report.router,
    prefix="/api/scam-report",
    tags=["Community Scam Reporting"]
)

@app.get("/")
async def root():
    return {
        "platform": "Trinetra",
        "tagline": "AI-Powered Digital Public Safety Intelligence",
        "version": "1.0.0",
        "endpoints": {
            "digital_arrest": "/api/digital-arrest/analyze",
            "message_fraud": "/api/message-fraud/analyze",
            "document_verify": "/api/document-verify/analyze",
            "docs": "/docs"
        }
    }