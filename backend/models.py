"""
LexVoice AI - SQLAlchemy 2.0 ORM Models
Persistent schema for cryptographic milestone escrow, contract dispute audits, and DPDP compliance logs.
"""

from datetime import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, Text
from database import Base

class MilestoneRecord(Base):
    __tablename__ = "milestones"

    id = Column(String(64), primary_key=True, index=True)
    project_name = Column(String(128), nullable=False)
    milestone_title = Column(String(128), nullable=False)
    amount_usd = Column(Float, nullable=False)
    developer_email = Column(String(128), nullable=False)
    client_email = Column(String(128), nullable=False)
    deliverable_summary = Column(Text, nullable=False)
    sha256_commitment = Column(String(128), nullable=False)
    status = Column(String(32), default="LOCKED")  # LOCKED, FUNDED, RELEASED
    ip_released = Column(Boolean, default=False)
    payment_method = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    funded_at = Column(DateTime, nullable=True)
    released_at = Column(DateTime, nullable=True)
    release_tx = Column(String(128), nullable=True)

    def to_dict(self):
        return {
            "milestone_id": self.id,
            "project_name": self.project_name,
            "milestone_title": self.milestone_title,
            "amount_usd": self.amount_usd,
            "developer_email": self.developer_email,
            "client_email": self.client_email,
            "deliverable_summary": self.deliverable_summary,
            "sha256_commitment": self.sha256_commitment,
            "status": self.status,
            "ip_released": self.ip_released,
            "payment_method": self.payment_method,
            "created_at": int(self.created_at.timestamp()) if self.created_at else None,
            "funded_at": int(self.funded_at.timestamp()) if self.funded_at else None,
            "released_at": int(self.released_at.timestamp()) if self.released_at else None,
            "release_tx": self.release_tx
        }

class ContractAuditRecord(Base):
    __tablename__ = "contract_audits"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(128), default="Untitled Agreement")
    jurisdiction = Column(String(64), default="US-India Cross-Border")
    raw_text = Column(Text, nullable=False)
    risk_score = Column(Float, default=0.0)
    verdict = Column(String(64), default="ANALYZED")
    findings_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "audit_id": self.id,
            "title": self.title,
            "jurisdiction": self.jurisdiction,
            "risk_score": self.risk_score,
            "verdict": self.verdict,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class DPDPAuditRecord(Base):
    __tablename__ = "dpdp_audits"

    id = Column(String(64), primary_key=True, index=True)
    contract_title = Column(String(128), default="Cross-Border DPA")
    compliance_score = Column(Float, default=0.0)
    is_compliant = Column(Boolean, default=False)
    violations_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "audit_id": self.id,
            "contract_title": self.contract_title,
            "compliance_score": self.compliance_score,
            "is_compliant": self.is_compliant,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
