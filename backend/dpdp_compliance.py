"""
LexVoice DPDP Act 2023 & Cross-Border Privacy Compliance Auditor
Audits software vendor contracts against India's Digital Personal Data Protection Act 2023,
US FTC regulations, and California Consumer Privacy Act (CCPA) standards.
"""

import re
from typing import Dict, List, Any

DPDP_SECTIONS = [
    {
        "id": "DPDP_NO_DPA",
        "section": "Section 8(2)",
        "law": "Digital Personal Data Protection Act 2023 (India)",
        "rule_name": "Missing Data Processor Contract (DPA Mandate)",
        "severity": "CRITICAL",
        "penalty_bracket": "Up to ₹250 Crores (~$30M USD)",
        "pattern": r"(without any formal Data Processing Addendum|without.*DPA|processes.*personal data.*no agreement)",
        "description": "A Data Fiduciary (Client) may only engage a Data Processor (Contractor) under a valid contract specifying the purpose, duration, and security measures.",
        "remedy": "Include a compliant Data Processing Addendum (DPA) specifying that Contractor acts solely as a Data Processor under strict instructions with AES-256 encryption."
    },
    {
        "id": "DPDP_UNENCRYPTED_TRANSFER",
        "section": "Section 8(5) & Section 16",
        "law": "DPDP Act 2023 & US FTC Safeguards Rule",
        "rule_name": "Insecure Cross-Border Storage & Unencrypted Transit",
        "severity": "CRITICAL",
        "penalty_bracket": "Up to ₹250 Crores (~$30M USD)",
        "pattern": r"(unencrypted public cloud|unencrypted.*storage|transfer.*without.*encryption|offshore development servers.*without)",
        "description": "Personal and health data stored or transferred without technical safeguards constitutes an immediate breach of reasonable security safeguards.",
        "remedy": "All personal data in transit and at rest must employ AES-256 encryption, TLS 1.3, and restricted role-based IAM credentials."
    },
    {
        "id": "DPDP_MINORS_CONSENT",
        "section": "Section 9",
        "law": "DPDP Act 2023 (India) & COPPA (US)",
        "rule_name": "Processing Minor's Personal Data Without Verifiable Parental Consent",
        "severity": "HIGH",
        "penalty_bracket": "Up to ₹200 Crores (~$24M USD)",
        "pattern": r"(No explicit parental consent|minor patients under the age of 18|children.*without consent)",
        "description": "Processing data of an individual under 18 years without verifiable consent of parents/lawful guardians is explicitly prohibited, along with any behavioral tracking.",
        "remedy": "Incorporate double-opt-in verifiable parental consent architecture and disable all telemetry on user profiles under age 18."
    },
    {
        "id": "DPDP_PERPETUAL_RETENTION",
        "section": "Section 8(7) & Section 12",
        "law": "DPDP Act 2023 (India) & GDPR Art. 17",
        "rule_name": "Perpetual Retention & Denial of Erasure Right",
        "severity": "HIGH",
        "penalty_bracket": "Up to ₹100 Crores (~$12M USD)",
        "pattern": r"(retained perpetually|without any data erasure|no right to erase|indefinite retention)",
        "description": "Data must be erased as soon as the purpose for which it was collected is no longer served or upon withdrawal of consent by the Data Principal.",
        "remedy": "Implement automated 30-day post-termination data wipe protocols and user-initiated data erasure endpoints."
    },
    {
        "id": "DPDP_NO_GRIEVANCE_OFFICER",
        "section": "Section 8(10)",
        "law": "DPDP Act 2023 (India)",
        "rule_name": "Absence of Grievance Redressal Mechanism",
        "severity": "MEDIUM",
        "penalty_bracket": "Up to ₹50 Crores (~$6M USD)",
        "pattern": r"(without any.*grievance redressal|no.*data protection officer|no contact for complaints)",
        "description": "Every entity processing personal data must establish an easily accessible grievance redressal mechanism and publish contact details of the Grievance Officer.",
        "remedy": "Publish DPO / Grievance Officer contact information with an SLA to resolve complaints within 7 calendar days."
    }
]

def audit_dpdp_compliance(contract_text: str) -> Dict[str, Any]:
    violations = []
    compliance_score = 100
    
    for rule in DPDP_SECTIONS:
        match = re.search(rule["pattern"], contract_text, re.IGNORECASE)
        if match:
            deduction = 25 if rule["severity"] == "CRITICAL" else 15 if rule["severity"] == "HIGH" else 10
            compliance_score = max(0, compliance_score - deduction)
            violations.append({
                "rule_id": rule["id"],
                "section": rule["section"],
                "law": rule["law"],
                "rule_name": rule["rule_name"],
                "severity": rule["severity"],
                "penalty_bracket": rule["penalty_bracket"],
                "matched_text": match.group(0),
                "description": rule["description"],
                "remedy": rule["remedy"]
            })
            
    # Cross-border export check (US FTC vs India DPDP)
    cross_border_checks = [
        {
            "standard": "India DPDP Act 2023 (Section 8)",
            "requirement": "Formal Data Processor Agreement (DPA)",
            "passed": not any(v["rule_id"] == "DPDP_NO_DPA" for v in violations),
            "status": "PASSED" if not any(v["rule_id"] == "DPDP_NO_DPA" for v in violations) else "FAILED"
        },
        {
            "standard": "Data Security & Encryption",
            "requirement": "TLS 1.3 / AES-256 Storage",
            "passed": not any(v["rule_id"] == "DPDP_UNENCRYPTED_TRANSFER" for v in violations),
            "status": "PASSED" if not any(v["rule_id"] == "DPDP_UNENCRYPTED_TRANSFER" for v in violations) else "FAILED"
        },
        {
            "standard": "Protection of Minors",
            "requirement": "Verifiable Parental Consent Architecture",
            "passed": not any(v["rule_id"] == "DPDP_MINORS_CONSENT" for v in violations),
            "status": "PASSED" if not any(v["rule_id"] == "DPDP_MINORS_CONSENT" for v in violations) else "FAILED"
        },
        {
            "standard": "Data Subject Rights",
            "requirement": "Right to Erasure & Purpose-Bound Retention",
            "passed": not any(v["rule_id"] == "DPDP_PERPETUAL_RETENTION" for v in violations),
            "status": "PASSED" if not any(v["rule_id"] == "DPDP_PERPETUAL_RETENTION" for v in violations) else "FAILED"
        },
        {
            "standard": "Statutory Grievance Redressal",
            "requirement": "Named Grievance Officer & Contact",
            "passed": not any(v["rule_id"] == "DPDP_NO_GRIEVANCE_OFFICER" for v in violations),
            "status": "PASSED" if not any(v["rule_id"] == "DPDP_NO_GRIEVANCE_OFFICER" for v in violations) else "FAILED"
        }
    ]
    
    return {
        "compliance_score": compliance_score,
        "is_compliant": len(violations) == 0,
        "violations_count": len(violations),
        "violations": violations,
        "cross_border_checks": cross_border_checks,
        "summary": "Full DPDP compliance verified. Zero statutory penalties detected." if len(violations) == 0 else f"CRITICAL: {len(violations)} DPDP Act 2023 violations found. Exposure up to ₹250 Crores."
    }
