"""
Sample contracts grounded in real-world Reddit disputes from r/freelance and r/smallbusiness.
"""

SAMPLE_CONTRACTS = {
    "us_india_scope_creep": {
        "title": "US Client vs Indian Offshore Dev (The Scope Creep & Withheld $5,000 Trap)",
        "source": "Reddit r/freelance: 'Client refused to pay final $5k claiming mobile app was incomplete after asking for 4 major unplanned features'",
        "market": "US-India Cross-Border",
        "contract_text": """MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is made between Apex Dynamics LLC, a Delaware corporation ("Client"), and DevSpark Solutions Private Limited, a company incorporated under the laws of India ("Contractor").

1. SCOPE OF WORK
Contractor agrees to develop a cross-platform logistics management web application as generally described in Exhibit A. Contractor shall deliver all work to the reasonable satisfaction of Client and shall implement all modifications, revisions, enhancements, and feature adjustments requested by Client until full satisfaction is achieved.

2. COMPENSATION AND PAYMENT
Client shall pay Contractor a fixed total fee of $10,000 USD, payable as follows:
- $2,500 deposit upon signing.
- $2,500 upon delivery of preliminary wireframes.
- $5,000 upon final deployment, testing, and Client's sole written acceptance.
In the event that Client determines, in its sole discretion, that the deliverables require further refinements, bug fixes, or functionality adjustments, final payment of $5,000 shall be withheld indefinitely until all items are completed to Client's absolute approval.

3. INTELLECTUAL PROPERTY ASSIGNMENT
Contractor hereby irrevocably assigns, transfers, and conveys to Client all right, title, and interest in and to all source code, algorithms, designs, documentation, and work product created, conceived, or prepared by Contractor, immediately upon creation of such code, regardless of whether payment has been tendered by Client. Contractor shall deliver all git repositories, master API keys, and production credentials to Client immediately upon initial demo.

4. INDEMNIFICATION AND LIABILITY
Contractor shall defend, indemnify, and hold harmless Client, its officers, and affiliates against any and all claims, losses, damages, liabilities, and expenses (including uncapped attorney fees) arising from any bugs, delivery delays, data interruptions, or alleged service defects. Contractor's liability under this Agreement shall be completely unlimited.

5. GOVERNING LAW AND DISPUTE RESOLUTION
This Agreement shall be governed exclusively by the laws of the State of Delaware, United States. Any dispute, claim, or controversy shall be resolved exclusively through binding arbitration in Wilmington, Delaware. Each party shall bear their own travel, legal, and arbitration filing costs.

6. DATA PROTECTION AND CONFIDENTIALITY
Contractor shall maintain the strict confidentiality of all Client end-user data. Contractor may process customer personal data across its offshore development servers in Bengaluru, India without any formal Data Processing Addendum (DPA).
"""
    },
    "uncapped_indemnity_saas": {
        "title": "Uncapped Indemnity & Hostile Non-Compete Agreement",
        "source": "Reddit r/smallbusiness: 'Client asked for $1M indemnity clause on a $3,000 marketing dashboard'",
        "market": "US Domestic",
        "contract_text": """SOFTWARE DEVELOPMENT CONSULTING CONTRACT

Between Horizon Media Corp ("Company") and Jane Doe, Sole Proprietor ("Developer").

1. DELIVERABLES & TIMELINE
Developer shall build an automated analytics dashboard. Time is of the essence. If delivery is delayed by even one business day, Company reserves the right to impose liquidated damages of $500 per day.

2. PAYMENT TERMS
Company will pay Developer $3,500 Net-60 days following full delivery and approval. No deposit shall be provided. If Company disputes any invoice line item, the entire invoice payment shall be suspended.

3. UNLIMITED INDEMNIFICATION
Developer agrees to indemnify and hold harmless Company for any third-party loss, security breach, server downtime, or revenue deficit, without any dollar limitation or cap on liability.

4. NON-COMPETE RESTRICTION
For a period of three (3) years following termination of this Contract, Developer shall not provide software development, consulting, or technical advisory services to any business operating in North America or Asia within the media, advertising, SaaS, or data analytics sectors.
"""
    },
    "india_dpdp_non_compliant": {
        "title": "DPDP Act 2023 & Cross-Border Non-Compliant Healthcare Portal",
        "source": "Reddit r/developersIndia: 'Offshore agency storing Indian citizen health records on US S3 bucket without consent architecture'",
        "market": "India Domestic & Offshore",
        "contract_text": """SOFTWARE VENDOR SERVICE AGREEMENT

Between MediCare Tech Solutions Private Limited ("Client") and CloudSync Systems ("Vendor").

1. ENGAGEMENT & USER DATA
Vendor shall build a patient consultation scheduling portal. Vendor shall ingest, store, and process patient demographic, diagnostic, and prescription data from Indian medical clinics.

2. DATA STORAGE AND TRANSFERS
Patient personal and health data may be stored in unencrypted public cloud storage located in the United States and Singapore. No explicit parental consent shall be collected for minor patients under the age of 18. Personal data may be retained perpetually without any data erasure mechanism or grievance redressal officer contact.

3. PAYMENT AND MILESTONES
Fees shall be paid in Indian Rupees (INR). Milestone payments shall be made upon completion of alpha and beta releases.
"""
    }
}
