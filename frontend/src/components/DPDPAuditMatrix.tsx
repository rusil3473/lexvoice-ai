import { ShieldAlert, CheckCircle2, XCircle, Scale } from 'lucide-react';

interface Violation {
  rule_id: string;
  section: string;
  law: string;
  rule_name: string;
  severity: string;
  penalty_bracket: string;
  matched_text: string;
  description: string;
  remedy: string;
}

interface CheckItem {
  standard: string;
  requirement: string;
  passed: boolean;
  status: string;
}

interface DPDPAuditProps {
  auditData: {
    compliance_score: number;
    is_compliant: boolean;
    violations_count: number;
    violations: Violation[];
    cross_border_checks: CheckItem[];
    summary: string;
  } | null;
}

export const DPDPAuditMatrix: React.FC<DPDPAuditProps> = ({ auditData }) => {
  if (!auditData) return null;

  const score = auditData.compliance_score;
  const isSafe = auditData.is_compliant;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scale size={22} color="var(--primary)" />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>India DPDP Act 2023 & Cross-Border Regulatory Audit</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
              Statutory verification under the Digital Personal Data Protection Act (India) & US FTC Safeguards Rule
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Compliance Score:</span>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: score >= 80 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)'
          }}>
            {score}/100
          </span>
          <span className={isSafe ? 'badge badge-success' : 'badge badge-critical'}>
            {isSafe ? 'DPDP Compliant' : 'Statutory Violations'}
          </span>
        </div>
      </div>

      {/* 5-Item Cross-Border Standards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {auditData.cross_border_checks.map((c, i) => (
          <div
            key={i}
            style={{
              background: 'hsla(222, 47%, 9%, 0.7)',
              border: c.passed ? '1px solid hsla(158, 64%, 52%, 0.3)' : '1px solid hsla(0, 84%, 60%, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {c.standard}
              </span>
              {c.passed ? (
                <CheckCircle2 size={16} color="var(--success)" />
              ) : (
                <XCircle size={16} color="var(--danger)" />
              )}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {c.requirement}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: c.passed ? 'var(--success)' : 'var(--danger)' }}>
              {c.status}
            </div>
          </div>
        ))}
      </div>

      {/* Specific Violations List */}
      {auditData.violations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} />
            <span>Active Statutory Penalties & Recommended Remedies</span>
          </h4>

          {auditData.violations.map((v, idx) => (
            <div
              key={idx}
              style={{
                background: 'hsla(0, 84%, 60%, 0.06)',
                border: '1px solid hsla(0, 84%, 60%, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-critical">{v.section}</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>{v.rule_name}</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--danger)' }}>
                  Statutory Penalty: {v.penalty_bracket}
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {v.description}
              </p>

              <div style={{
                background: 'hsla(158, 64%, 52%, 0.08)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: '#86efac'
              }}>
                <strong>Required DPDP Remediation:</strong> {v.remedy}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
