"""
Automated unit test suite for LexVoice AI backend algorithms.
"""

import pytest
from contract_engine import analyze_contract
from dpdp_compliance import audit_dpdp_compliance
from escrow_vault import EscrowVault
from sample_contracts import SAMPLE_CONTRACTS

def test_scope_creep_detection():
    text = "Contractor shall implement all modifications, enhancements, and feature adjustments requested by Client until full satisfaction."
    res = analyze_contract(text)
    assert res["risk_score"] > 0
    assert any(f["id"] == "SCOPE_CREEP_UNLIMITED" for f in res["findings"])
    assert res["findings"][0]["severity"] == "CRITICAL"
    assert "counter_proposal" in res["findings"][0]

def test_premature_ip_assignment():
    text = "Contractor assigns all right, title, and interest in source code immediately upon creation regardless of whether payment has been tendered."
    res = analyze_contract(text)
    assert any(f["id"] == "PREMATURE_IP_ASSIGNMENT" for f in res["findings"])
    assert res["metrics"]["ip_risk"] > 50

def test_uncapped_indemnity():
    text = "Contractor shall defend, indemnify, and hold harmless Client against all claims with completely unlimited liability."
    res = analyze_contract(text)
    assert any(f["id"] == "UNCAPPED_INDEMNITY" for f in res["findings"])
    assert res["metrics"]["liability_exposure"] > 50

def test_reddit_us_india_sample_contract():
    raw = SAMPLE_CONTRACTS["us_india_scope_creep"]["contract_text"]
    res = analyze_contract(raw)
    assert res["risk_score"] >= 65  # Should be flagged as CRITICAL
    assert "CRITICAL RISK" in res["verdict"]
    assert len(res["findings"]) >= 4

def test_dpdp_compliance_audit():
    raw = SAMPLE_CONTRACTS["india_dpdp_non_compliant"]["contract_text"]
    res = audit_dpdp_compliance(raw)
    assert res["is_compliant"] is False
    assert res["compliance_score"] < 50
    assert any(v["rule_id"] == "DPDP_UNENCRYPTED_TRANSFER" for v in res["violations"])
    assert any(v["rule_id"] == "DPDP_MINORS_CONSENT" for v in res["violations"])

def test_escrow_vault_lifecycle():
    vault = EscrowVault()
    ms = vault.create_milestone(
        project_name="E-Commerce Mobile App",
        milestone_title="Final Payment Milestone",
        amount_usd=3000.0,
        developer_email="dev@example.com",
        client_email="client@example.com",
        deliverable_summary="Flutter source code and signed APK"
    )
    assert ms["status"] == "LOCKED"
    assert ms["ip_released"] is False
    assert len(ms["sha256_commitment"]) == 64
    
    # Fund milestone
    funded = vault.fund_milestone(ms["milestone_id"])
    assert funded["status"] == "FUNDED"
    assert funded["funded_at"] is not None
    
    # Release milestone
    released = vault.release_milestone(ms["milestone_id"])
    assert released["status"] == "RELEASED"
    assert released["ip_released"] is True
    assert released["release_tx"].startswith("0x")

def test_sqlite_persistence_api():
    from fastapi.testclient import TestClient
    from app import app
    client = TestClient(app)

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert "SQLite" in data["database"]["engine"]
    assert data["database"]["stats"]["milestones"] >= 2

    # 2. Create milestone
    ms_payload = {
        "project_name": "Cloud Microservices",
        "milestone_title": "Phase 1 Auth API",
        "amount_usd": 2500.0,
        "developer_email": "dev@cloud.io",
        "client_email": "client@enterprise.com",
        "deliverable_summary": "Go microservices with JWT auth and SQLite persistence"
    }
    create_res = client.post("/api/escrow/create", json=ms_payload)
    assert create_res.status_code == 200
    created = create_res.json()
    ms_id = created["milestone_id"]
    assert created["status"] == "LOCKED"

    # 3. Fund milestone
    fund_res = client.post(f"/api/escrow/fund/{ms_id}")
    assert fund_res.status_code == 200
    assert fund_res.json()["status"] == "FUNDED"

    # 4. Release milestone
    rel_res = client.post(f"/api/escrow/release/{ms_id}")
    assert rel_res.status_code == 200
    assert rel_res.json()["status"] == "RELEASED"
    assert rel_res.json()["ip_released"] is True

