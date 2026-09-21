import React from 'react';
import { MessageSquareQuote, ArrowRight, AlertTriangle, ShieldAlert, FileText } from 'lucide-react';

interface RedditBannerProps {
  onSelectScenario: (key: string) => void;
  activeScenario: string;
}

export const RedditBanner: React.FC<RedditBannerProps> = ({ onSelectScenario, activeScenario }) => {
  const scenarios = [
    {
      key: 'us_india_scope_creep',
      subreddit: 'r/freelance',
      title: 'US Client vs Indian Offshore Dev ($5,000 Scope Creep Trap)',
      quote: 'Client in US refused final $5k claiming 4 extra unplanned features were required before any payout.',
      icon: <AlertTriangle size={16} color="var(--danger)" />
    },
    {
      key: 'uncapped_indemnity_saas',
      subreddit: 'r/smallbusiness',
      title: 'Uncapped $1M Indemnity on a $3,500 Contract',
      quote: 'Client slipped unlimited liability and Net-60 payment terms on a small analytics dashboard.',
      icon: <ShieldAlert size={16} color="var(--warning)" />
    },
    {
      key: 'india_dpdp_non_compliant',
      subreddit: 'r/developersIndia',
      title: 'DPDP Act 2023 Non-Compliant Healthcare Portal',
      quote: 'Client storing unencrypted patient data across foreign servers with no parental consent or DPA.',
      icon: <FileText size={16} color="var(--primary)" />
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <MessageSquareQuote size={20} color="var(--primary)" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Real-World Community Evidence (Extracted from Reddit)</h3>
        <span className="badge badge-warning">Live Grounding</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '14px' }}>
        {scenarios.map((s) => {
          const isSelected = activeScenario === s.key;
          return (
            <div
              key={s.key}
              onClick={() => onSelectScenario(s.key)}
              style={{
                background: isSelected ? 'hsla(239, 84%, 67%, 0.12)' : 'hsla(222, 30%, 15%, 0.5)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>{s.subreddit}</span>
                  {s.icon}
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{s.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: isSelected ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
                <span>{isSelected ? 'Loaded into Auditor' : 'Load Dispute Case'}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
