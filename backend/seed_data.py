"""
LexVoice AI - Database Seeder & Schema Initializer
Creates SQLite tables and populates sample cryptographic milestone escrow records.
"""

import hashlib
import time
from datetime import datetime, timedelta
from database import engine, SessionLocal, Base
from models import MilestoneRecord, ContractAuditRecord, DPDPAuditRecord

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        existing = db.query(MilestoneRecord).first()
        if existing:
            return  # Already seeded

        print("[LEXVOICE DATABASE] Seeding initial milestone escrow records...")
        now = datetime.utcnow()

        ms1_payload = "MS-B7C91E04:Fintech Mobile App:Milestone 1 Core Architecture:3500.0:1774345000:Flutter app source code, Docker Compose, and API endpoints"
        ms1_hash = hashlib.sha256(ms1_payload.encode('utf-8')).hexdigest()

        ms2_payload = "MS-A892F110:AI Voice Transcriber:Milestone 2 Model Integration:4800.0:1774340000:Whisper model integration and real-time WebSocket pipeline"
        ms2_hash = hashlib.sha256(ms2_payload.encode('utf-8')).hexdigest()

        m1 = MilestoneRecord(
            id="MS-B7C91E04",
            project_name="Fintech Mobile App (US-India)",
            milestone_title="Milestone 1: Core Architecture & Escrow",
            amount_usd=3500.0,
            developer_email="dev.arjun@freelance.in",
            client_email="client.ops@nyctech.io",
            deliverable_summary="Flutter app source code, Docker Compose, and authenticated API endpoints",
            sha256_commitment=ms1_hash,
            status="LOCKED",
            ip_released=False,
            created_at=now - timedelta(days=2)
        )

        m2 = MilestoneRecord(
            id="MS-A892F110",
            project_name="AI Voice Transcriber",
            milestone_title="Milestone 2: Real-time Voice Pipeline",
            amount_usd=4800.0,
            developer_email="dev.priya@techforge.io",
            client_email="vp.engineering@siliconvalleylabs.com",
            deliverable_summary="Whisper model integration and real-time WebSocket pipeline",
            sha256_commitment=ms2_hash,
            status="FUNDED",
            ip_released=False,
            payment_method="Stripe/Escrow Verified",
            created_at=now - timedelta(days=5),
            funded_at=now - timedelta(hours=12)
        )

        db.add_all([m1, m2])
        db.commit()
        print("[LEXVOICE DATABASE] Database initialized & seeded with SQLite WAL mode!")

    except Exception as e:
        db.rollback()
        print(f"[LEXVOICE DATABASE ERROR] Seeding failed: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
