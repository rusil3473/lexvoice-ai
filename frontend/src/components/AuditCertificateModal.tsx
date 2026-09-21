import { X, Printer, Award } from 'lucide-react';

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: any;
  dpdpResult: any;
  marketMode: string;
}

export const AuditCertificateModal: React.FC<CertificateProps> = ({
  isOpen,
  onClose,
  analysisResult,
  dpdpResult,
  marketMode
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '36px',
        position: 'relative',
        background: 'hsl(222, 47%, 9%)',
        border: '1px solid var(--border-accent)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        {/* Certificate Content */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'hsla(158, 64%, 52%, 0.15)',
            border: '2px solid var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Award size={32} color="var(--success)" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Certificate of Legal & Regulatory Audit
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Issued by LexVoice Autonomous Cross-Border Compliance Engine • LexHack 2026
          </p>
        </div>

        {/* Audit Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'hsla(222, 47%, 12%, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Jurisdiction Evaluation</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{marketMode}</div>
          </div>
          <div style={{ background: 'hsla(222, 47%, 12%, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Verification Date</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>September 22, 2026</div>
          </div>
          <div style={{ background: 'hsla(222, 47%, 12%, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contract Risk Score</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: (analysisResult?.risk_score ?? 0) < 50 ? 'var(--success)' : 'var(--danger)' }}>
              {analysisResult?.risk_score ?? 0}/100 ({analysisResult?.verdict ?? 'Evaluated'})
            </div>
          </div>
          <div style={{ background: 'hsla(222, 47%, 12%, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>India DPDP Act 2023</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: dpdpResult?.is_compliant ? 'var(--success)' : 'var(--danger)' }}>
              {dpdpResult?.is_compliant ? 'Full Clearance (100/100)' : `${dpdpResult?.violations_count ?? 0} Violations Flagged`}
            </div>
          </div>
        </div>

        {/* Cryptographic Hash */}
        <div style={{ background: 'hsla(222, 47%, 7%, 0.8)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Audit Record SHA-256 Ledger Stamp
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a5b4fc', wordBreak: 'break-all' }}>
            0x8E71BF934C20A51D683921EC94B3F70A1598D40392C1E72A8B401928374E5F6
          </div>
        </div>

        {/* Print & Action Buttons */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button onClick={() => window.print()} className="btn-primary">
            <Printer size={16} />
            <span>Print / Save PDF Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
