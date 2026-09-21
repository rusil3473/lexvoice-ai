import { FileText, Play, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

interface ContractEditorProps {
  contractText: string;
  setContractText: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  analysisResult: any;
}

export const ContractEditor: React.FC<ContractEditorProps> = ({
  contractText,
  setContractText,
  onAnalyze,
  isAnalyzing,
  analysisResult
}) => {
  const wordCount = contractText.trim() ? contractText.trim().split(/\s+/).length : 0;
  const score = analysisResult?.risk_score ?? 0;
  const verdict = analysisResult?.verdict ?? 'Ready for Audit';
  const statusColor = analysisResult?.status_color ?? 'yellow';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', marginBottom: '24px' }}>
      
      {/* Left: Editor Pane */}
      <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Contract Clause Workspace</h3>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {wordCount} words • {contractText.length} characters
          </div>
        </div>

        <textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Paste contractual text, master services agreement (MSA), or statement of work (SOW) here to audit..."
          style={{
            width: '100%',
            height: '380px',
            background: 'hsla(222, 47%, 9%, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            marginBottom: '16px'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setContractText('')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <RotateCcw size={14} />
            <span>Clear Text</span>
          </button>

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !contractText.trim()}
            className="btn-primary"
            style={{ opacity: isAnalyzing ? 0.7 : 1 }}
          >
            {isAnalyzing ? (
              <>
                <Sparkles size={16} className="spin" />
                <span>Auditing Clauses...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Run Compliance & Risk Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: Real-Time Risk Radar */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Risk Evaluation Radar</h3>
            {statusColor === 'red' && <span className="badge badge-critical">Predatory Clauses Found</span>}
            {statusColor === 'yellow' && <span className="badge badge-warning">Moderate Risk</span>}
            {statusColor === 'green' && <span className="badge badge-success">Fair Terms</span>}
          </div>

          {/* Large Gauge */}
          <div style={{
            background: 'hsla(222, 47%, 9%, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Overall Contract Trap Score
            </div>
            <div style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: statusColor === 'red' ? 'var(--danger)' : statusColor === 'yellow' ? 'var(--warning)' : 'var(--success)',
              lineHeight: 1
            }}>
              {score}
              <span style={{ fontSize: '1.6rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {verdict}
            </div>
          </div>

          {/* Detailed Category Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Scope Creep */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Scope Creep & Modification Risk</span>
                <span style={{ fontWeight: 700, color: (analysisResult?.metrics?.scope_risk ?? 15) > 50 ? 'var(--danger)' : 'var(--success)' }}>
                  {analysisResult?.metrics?.scope_risk ?? 15}%
                </span>
              </div>
              <div style={{ height: '6px', background: 'hsla(222, 30%, 20%, 0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${analysisResult?.metrics?.scope_risk ?? 15}%`,
                  height: '100%',
                  background: (analysisResult?.metrics?.scope_risk ?? 15) > 50 ? 'var(--danger)' : 'var(--success)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Premature IP Forfeiture */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Premature IP Transfer Exposure</span>
                <span style={{ fontWeight: 700, color: (analysisResult?.metrics?.ip_risk ?? 10) > 50 ? 'var(--danger)' : 'var(--success)' }}>
                  {analysisResult?.metrics?.ip_risk ?? 10}%
                </span>
              </div>
              <div style={{ height: '6px', background: 'hsla(222, 30%, 20%, 0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${analysisResult?.metrics?.ip_risk ?? 10}%`,
                  height: '100%',
                  background: (analysisResult?.metrics?.ip_risk ?? 10) > 50 ? 'var(--danger)' : 'var(--success)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Payment Enforceability */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Payment Enforceability (Milestone Protection)</span>
                <span style={{ fontWeight: 700, color: (analysisResult?.metrics?.payment_enforceability ?? 85) < 50 ? 'var(--danger)' : 'var(--success)' }}>
                  {analysisResult?.metrics?.payment_enforceability ?? 85}%
                </span>
              </div>
              <div style={{ height: '6px', background: 'hsla(222, 30%, 20%, 0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${analysisResult?.metrics?.payment_enforceability ?? 85}%`,
                  height: '100%',
                  background: (analysisResult?.metrics?.payment_enforceability ?? 85) < 50 ? 'var(--danger)' : 'var(--success)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Liability Exposure */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Uncapped Liability & Indemnification</span>
                <span style={{ fontWeight: 700, color: (analysisResult?.metrics?.liability_exposure ?? 25) > 50 ? 'var(--danger)' : 'var(--success)' }}>
                  {analysisResult?.metrics?.liability_exposure ?? 25}%
                </span>
              </div>
              <div style={{ height: '6px', background: 'hsla(222, 30%, 20%, 0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${analysisResult?.metrics?.liability_exposure ?? 25}%`,
                  height: '100%',
                  background: (analysisResult?.metrics?.liability_exposure ?? 25) > 50 ? 'var(--danger)' : 'var(--success)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '20px',
          padding: '12px 16px',
          background: 'hsla(222, 30%, 15%, 0.5)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldAlert size={16} color="var(--primary)" />
          <span>Audit calibrated for US Delaware courts & India DPDP Act 2023 jurisdiction.</span>
        </div>
      </div>

    </div>
  );
};
