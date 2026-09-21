"""
LexVoice Contract Risk Analysis Engine
Evaluates contractual language for predatory traps, scope creep, premature IP transfer, and cross-border enforceability issues.
"""

import re
from typing import Dict, List, Any

RISK_RULES = [
    {
        "id": "SCOPE_CREEP_UNLIMITED",
        "category": "Scope of Work",
        "severity": "CRITICAL",
        "weight": 25,
        "title": "Unbounded Scope & Unlimited Revision Trap",
        "pattern": r"(all modifications|enhancements|feature adjustments|until full satisfaction|sole written acceptance|absolute approval)",
        "explanation": "Client has reserved the unilateral right to demand continuous, free modifications without a signed change order.",
        "reddit_context": "Directly matches r/freelance complaints where clients withheld final payment over 4 additional unplanned features.",
        "counter_proposal": "All additional revisions beyond the initial two (2) rounds of feedback shall be documented in a signed Change Order and billed at Contractor's standard rate of $85/hour."
    },
    {
        "id": "PREMATURE_IP_ASSIGNMENT",
        "category": "Intellectual Property",
        "severity": "CRITICAL",
        "weight": 25,
        "title": "Premature IP Assignment (Transferred Before Payment)",
        "pattern": r"(immediately upon creation|regardless of whether payment|deliver all git repositories.*credentials.*immediately|prior to full and final payment)",
        "explanation": "You forfeit all legal ownership of your code and credentials before the client pays you, leaving zero leverage.",
        "reddit_context": "A classic trap cited in r/smallbusiness: the client took the repo credentials, locked out the developer, and never paid the final milestone.",
        "counter_proposal": "All intellectual property rights, licenses, git repositories, and production credentials shall remain the exclusive property of Contractor until all invoices and milestone payments are received in full."
    },
    {
        "id": "UNCAPPED_INDEMNITY",
        "category": "Liability & Indemnification",
        "severity": "HIGH",
        "weight": 20,
        "title": "Uncapped Indemnification & Unlimited Liability",
        "pattern": r"(uncapped attorney fees|completely unlimited|without any dollar limitation|defend, indemnify, and hold harmless.*all claims)",
        "explanation": "You are agreeing to pay unlimited legal damages even if the fault lies with third-party software, cloud outages, or client mistakes.",
        "reddit_context": "Clients frequently drop 7-figure indemnity clauses on small $3k-$10k contracts, putting the developer's entire business at risk.",
        "counter_proposal": "Contractor's aggregate liability under this Agreement, regardless of the form of action, shall be strictly capped at the total amount of fees actually paid by Client to Contractor in the preceding three (3) months."
    },
    {
        "id": "CROSS_BORDER_JURISDICTION_TRAP",
        "category": "Jurisdiction & Dispute Resolution",
        "severity": "HIGH",
        "weight": 15,
        "title": "Asymmetric Foreign Jurisdiction Trap",
        "pattern": r"(State of Delaware|Wilmington, Delaware|binding arbitration in.*Delaware|Each party shall bear their own.*costs)",
        "explanation": "Forces an international or Indian contractor to travel to and pay for arbitration in the United States, which costs more than the unpaid invoice.",
        "reddit_context": "Indian freelancers noted that filing a claim in Delaware costs $5k+, making recovery of a $4k invoice mathematically impossible.",
        "counter_proposal": "Disputes shall be settled first through expedited virtual mediation. If unresolved, disputes under $25,000 shall be subject to online binding arbitration under UNCITRAL expedited rules, conducted entirely in English via video conference."
    },
    {
        "id": "PAYMENT_WITHHOLDING_TRAP",
        "category": "Payment & Escrow",
        "severity": "CRITICAL",
        "weight": 20,
        "title": "Indefinite Payment Withholding Clause",
        "pattern": r"(withheld indefinitely|Net-60|Net-90|suspended.*disputes any invoice|sole discretion.*final payment.*withheld)",
        "explanation": "Client can withhold the remaining 50% indefinitely simply by claiming an unspecified item needs adjustment.",
        "reddit_context": "Matches the exact pattern of clients ghosting at 90% completion and claiming small visual nitpicks to avoid paying the final milestone.",
        "counter_proposal": "Client shall provide written acceptance or detailed feedback within seven (7) business days of milestone delivery. In the absence of written feedback within 7 days, the milestone deliverable shall be deemed accepted and funds released automatically."
    },
    {
        "id": "HOSTILE_NON_COMPETE",
        "category": "Restrictive Covenants",
        "severity": "MEDIUM",
        "weight": 10,
        "title": "Hostile Multi-Year Broad Non-Compete",
        "pattern": r"(three \(3\) years.*not provide.*software|non-compete restriction|liquidated damages of \$\d+ per day)",
        "explanation": "Restricts your right to earn a living in entire industry sectors across global continents, often unenforceable but creates legal chilling effects.",
        "reddit_context": "Bans freelance developers from working in their core competency for years after a short contract.",
        "counter_proposal": "Developer shall be free to provide general software consulting services to any third party, provided Developer does not disclose or utilize Client's specific, proprietary, and confidential business secrets."
    }
]

def analyze_contract(contract_text: str) -> Dict[str, Any]:
    findings = []
    total_score = 0
    max_possible = sum(r["weight"] for r in RISK_RULES)
    
    lines = contract_text.split('\n')
    annotated_paragraphs = []
    
    for para in contract_text.split('\n\n'):
        para = para.strip()
        if not para:
            continue
            
        para_risks = []
        for rule in RISK_RULES:
            match = re.search(rule["pattern"], para, re.IGNORECASE)
            if match:
                snippet = match.group(0)
                para_risks.append({
                    "rule_id": rule["id"],
                    "title": rule["title"],
                    "severity": rule["severity"],
                    "matched_text": snippet,
                    "explanation": rule["explanation"],
                    "reddit_context": rule["reddit_context"],
                    "counter_proposal": rule["counter_proposal"]
                })
                # Add to global findings if not already present
                if not any(f["id"] == rule["id"] for f in findings):
                    findings.append({
                        "id": rule["id"],
                        "category": rule["category"],
                        "severity": rule["severity"],
                        "weight": rule["weight"],
                        "title": rule["title"],
                        "matched_snippet": snippet,
                        "explanation": rule["explanation"],
                        "reddit_context": rule["reddit_context"],
                        "counter_proposal": rule["counter_proposal"]
                    })
                    total_score += rule["weight"]
                    
        annotated_paragraphs.append({
            "text": para,
            "has_risk": len(para_risks) > 0,
            "risks": para_risks
        })
        
    # Scale risk score to 0 - 100
    normalized_score = min(100, int((total_score / max_possible) * 100)) if max_possible > 0 else 0
    
    if normalized_score >= 65:
        verdict = "CRITICAL RISK (Predatory Contractor Trap)"
        status_color = "red"
    elif normalized_score >= 35:
        verdict = "MODERATE RISK (Amendments Required)"
        status_color = "yellow"
    else:
        verdict = "LOW RISK (Fair Commercial Terms)"
        status_color = "green"
        
    return {
        "risk_score": normalized_score,
        "verdict": verdict,
        "status_color": status_color,
        "findings_count": len(findings),
        "findings": findings,
        "annotated_paragraphs": annotated_paragraphs,
        "metrics": {
            "scope_risk": 85 if any(f["id"] == "SCOPE_CREEP_UNLIMITED" for f in findings) else 15,
            "ip_risk": 90 if any(f["id"] == "PREMATURE_IP_ASSIGNMENT" for f in findings) else 10,
            "payment_enforceability": 20 if any(f["id"] in ["PAYMENT_WITHHOLDING_TRAP", "CROSS_BORDER_JURISDICTION_TRAP"] for f in findings) else 85,
            "liability_exposure": 95 if any(f["id"] == "UNCAPPED_INDEMNITY" for f in findings) else 25
        }
    }
