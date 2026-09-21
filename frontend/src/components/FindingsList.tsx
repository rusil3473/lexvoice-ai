import { useState } from 'react';
import { ShieldCheck, ArrowRight, Languages, Check, AlertTriangle } from 'lucide-react';

interface Finding {
  id: string;
  category: string;
  severity: string;
  weight: number;
  title: string;
  matched_snippet: string;
  explanation: string;
  reddit_context: string;
  counter_proposal: string;
}

interface FindingsListProps {
  findings: Finding[];
  onApplyCounterProposal: (snippet: string, replacement: string) => void;
}

export const FindingsList: React.FC<FindingsListProps> = ({ findings, onApplyCounterProposal }) => {
  const [langMap, setLangMap] = useState<Record<string, 'en' | 'hi'>>({});
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({});

  const toggleLang = (id: string) => {
    setLangMap((prev) => ({
      ...prev,
      [id]: prev[id] === 'hi' ? 'en' : 'hi'
    }));
  };

  const handleApply = (f: Finding) => {
    onApplyCounterProposal(f.matched_snippet, f.counter_proposal);
    setAppliedMap((prev) => ({ ...prev, [f.id]: true }));
  };

  if (!findings || findings.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
        <ShieldCheck size={42} color="var(--success)" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)' }}>Zero Predatory Traps Detected</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
          This agreement uses standard commercial terms without hidden scope-creep traps, premature IP transfer, or unbonded indemnities.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Predatory Clause Breakdown & Redline Fixes</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            {findings.length} contractual traps identified with calibrated counter-proposals.
          </p>
        </div>
        <span className="badge badge-critical">{findings.length} Issues Found</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {findings.map((f) => {
          const isHindi = langMap[f.id] === 'hi';
          const isApplied = appliedMap[f.id];

          return (
            <div
              key={f.id}
              style={{
                background: 'hsla(222, 47%, 9%, 0.8)',
                border: f.severity === 'CRITICAL' ? '1px solid hsla(0, 84%, 60%, 0.3)' : '1px solid hsla(38, 92%, 50%, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 22px'
              }}
            >
              {/* Header line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={f.severity === 'CRITICAL' ? 'badge badge-critical' : 'badge badge-warning'}>
                    {f.severity}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{f.title}</h4>
                </div>

                <button
                  onClick={() => toggleLang(f.id)}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '4px 10px', gap: '4px' }}
                >
                  <Languages size={13} />
                  <span>{isHindi ? 'Switch to English' : 'हिंदी में समझें'}</span>
                </button>
              </div>

              {/* Matched Snippet */}
              <div style={{
                background: 'hsla(0, 84%, 60%, 0.08)',
                borderLeft: '3px solid var(--danger)',
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#fca5a5',
                marginBottom: '12px'
              }}>
                "{f.matched_snippet}"
              </div>

              {/* Explanation & Reddit Context */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {isHindi ? (
                  <span>
                    <strong>सरल हिंदी में:</strong> यह शर्त ग्राहक को अधिकार देती है कि वह आपसे लगातार बदलाव मांगता रहे और अंतिम भुगतान रोक ले।
                  </span>
                ) : (
                  f.explanation
                )}
              </p>

              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                background: 'hsla(222, 30%, 15%, 0.5)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <AlertTriangle size={14} color="var(--warning)" />
                <span>Reddit Validation: {f.reddit_context}</span>
              </div>

              {/* Recommended Counter-Proposal Box */}
              <div style={{
                background: 'hsla(158, 64%, 52%, 0.08)',
                border: '1px solid hsla(158, 64%, 52%, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Recommended Fair Counter-Proposal (Drop-In Replacement)
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#86efac', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
                    "{f.counter_proposal}"
                  </div>
                </div>

                <button
                  onClick={() => handleApply(f)}
                  disabled={isApplied}
                  className="btn-primary"
                  style={{
                    background: isApplied ? 'var(--success)' : 'linear-gradient(135deg, hsl(158, 64%, 42%), hsl(158, 64%, 52%))',
                    fontSize: '0.82rem',
                    padding: '8px 14px',
                    boxShadow: 'none'
                  }}
                >
                  {isApplied ? (
                    <>
                      <Check size={14} />
                      <span>Clause Applied</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight size={14} />
                      <span>Apply Fix to Contract</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
