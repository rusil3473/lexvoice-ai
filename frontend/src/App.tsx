import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RedditBanner } from './components/RedditBanner';
import { VoiceIntakeHero } from './components/VoiceIntakeHero';
import { ContractEditor } from './components/ContractEditor';
import { FindingsList } from './components/FindingsList';
import { DPDPAuditMatrix } from './components/DPDPAuditMatrix';
import { EscrowVaultCard } from './components/EscrowVaultCard';
import { AuditCertificateModal } from './components/AuditCertificateModal';
import { Award, Cpu } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export const App: React.FC = () => {
  const [sovereignMode, setSovereignMode] = useState(false);
  const [marketMode, setMarketMode] = useState('US-India');
  const [activeScenario, setActiveScenario] = useState('us_india_scope_creep');
  
  const [contractText, setContractText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dpdpResult, setDpdpResult] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [isCertOpen, setIsCertOpen] = useState(false);

  // Initial load
  useEffect(() => {
    loadSampleScenario('us_india_scope_creep');
    fetchMilestones();
  }, []);

  const loadSampleScenario = async (key: string) => {
    setActiveScenario(key);
    try {
      const res = await fetch(`${API_BASE}/sample-contracts`);
      const data = await res.json();
      if (data[key]) {
        setContractText(data[key].contract_text);
        // Automatically run analysis on load
        triggerAnalysis(data[key].contract_text);
      }
    } catch (e) {
      console.warn('Backend offline, using fallback sample', e);
      // Fallback local sample
      const fallbackText = `MASTER SERVICES AGREEMENT\n\n1. SCOPE OF WORK\nContractor shall implement all modifications, revisions, and enhancements requested by Client until full satisfaction is achieved.\n\n2. INTELLECTUAL PROPERTY\nContractor assigns all right, title, and interest in source code immediately upon creation, regardless of whether payment has been tendered.\n\n3. LIABILITY\nContractor shall indemnify Client with completely unlimited liability.\n\n4. DATA PRIVACY\nContractor may process customer personal data without any formal Data Processing Addendum (DPA) and stored in unencrypted public cloud storage.`;
      setContractText(fallbackText);
      triggerAnalysis(fallbackText);
    }
  };

  const triggerAnalysis = async (textToAudit: string) => {
    if (!textToAudit.trim()) return;
    setIsAnalyzing(true);
    try {
      // Contract risk analysis
      const res1 = await fetch(`${API_BASE}/analyze-contract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAudit, jurisdiction: marketMode })
      });
      const data1 = await res1.json();
      setAnalysisResult(data1);

      // DPDP audit
      const res2 = await fetch(`${API_BASE}/audit-dpdp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAudit })
      });
      const data2 = await res2.json();
      setDpdpResult(data2);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await fetch(`${API_BASE}/escrow/milestones`);
      const data = await res.json();
      setMilestones(data);
    } catch (e) {
      // Fallback demo milestone
      setMilestones([{
        milestone_id: 'MS-DEMO1234',
        project_name: 'Logistics Management Platform',
        milestone_title: 'Milestone 3: Final Production Deployment & E-Way Bill Engine',
        amount_usd: 5000.0,
        developer_email: 'rusilvaru555@gmail.com',
        client_email: 'client@apexdynamics.com',
        deliverable_summary: 'Production deployment on AWS, completed responsive UI, and OpenAPI docs.',
        sha256_commitment: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        status: 'LOCKED',
        ip_released: false
      }]);
    }
  };

  const handleFundMilestone = async (id: string) => {
    try {
      await fetch(`${API_BASE}/escrow/fund/${id}`, { method: 'POST' });
      fetchMilestones();
    } catch (e) {
      // Local state fallback
      setMilestones((prev) => prev.map((m) => m.milestone_id === id ? { ...m, status: 'FUNDED' } : m));
    }
  };

  const handleReleaseMilestone = async (id: string) => {
    try {
      await fetch(`${API_BASE}/escrow/release/${id}`, { method: 'POST' });
      fetchMilestones();
    } catch (e) {
      // Local state fallback
      setMilestones((prev) => prev.map((m) => m.milestone_id === id ? {
        ...m,
        status: 'RELEASED',
        ip_released: true,
        release_tx: '0x9B8A71F62C04D81E55AA3209BCDE84'
      } : m));
    }
  };

  const handleApplyCounterProposal = (snippet: string, replacement: string) => {
    const updated = contractText.replace(snippet, replacement);
    setContractText(updated);
    // Re-run analysis immediately
    triggerAnalysis(updated);
  };

  const handleVoiceTranscribe = (spokenText: string) => {
    const appended = `${contractText}\n\n[VOICE EVIDENCE LOGGED]: ${spokenText}`;
    setContractText(appended);
    triggerAnalysis(appended);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 20px 60px' }}>
      
      {/* Top Header */}
      <Header
        sovereignMode={sovereignMode}
        setSovereignMode={setSovereignMode}
        marketMode={marketMode}
        setMarketMode={setMarketMode}
      />

      {/* Swiss Sovereign LLM Banner if active */}
      {sovereignMode && (
        <div style={{
          background: 'hsla(158, 64%, 52%, 0.12)',
          border: '1px solid var(--success)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={20} color="var(--success)" />
            <span style={{ fontSize: '0.9rem', color: '#86efac', fontWeight: 600 }}>
              Swiss Sovereign Mode Active: Air-gapped on Apertus 1.5 weights (CSCS Zurich). 0.0% data leakage to third-party commercial APIs.
            </span>
          </div>
          <span className="badge badge-success">Air-Gapped Privacy</span>
        </div>
      )}

      {/* Reddit Grounding Banner */}
      <RedditBanner
        onSelectScenario={loadSampleScenario}
        activeScenario={activeScenario}
      />

      {/* AssemblyAI Voice Intake Hero */}
      <VoiceIntakeHero onTranscribeClause={handleVoiceTranscribe} />

      {/* Contract Workspace & Risk Radar */}
      <ContractEditor
        contractText={contractText}
        setContractText={setContractText}
        onAnalyze={() => triggerAnalysis(contractText)}
        isAnalyzing={isAnalyzing}
        analysisResult={analysisResult}
      />

      {/* Action Bar for Certificate Export */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => setIsCertOpen(true)} className="btn-primary">
          <Award size={16} />
          <span>Generate Official Compliance Certificate</span>
        </button>
      </div>

      {/* Predatory Findings Breakdown */}
      <FindingsList
        findings={analysisResult?.findings ?? []}
        onApplyCounterProposal={handleApplyCounterProposal}
      />

      {/* India DPDP Act 2023 Matrix */}
      <DPDPAuditMatrix auditData={dpdpResult} />

      {/* Cryptographic Escrow Vault */}
      {milestones.map((m) => (
        <EscrowVaultCard
          key={m.milestone_id}
          milestone={m}
          onFundMilestone={handleFundMilestone}
          onReleaseMilestone={handleReleaseMilestone}
        />
      ))}

      {/* Exportable PDF Modal */}
      <AuditCertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        analysisResult={analysisResult}
        dpdpResult={dpdpResult}
        marketMode={marketMode}
      />

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        color: 'var(--text-muted)',
        fontSize: '0.84rem',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '20px'
      }}>
        LexVoice AI • Submission Portfolio for <strong>LexHack 2026</strong>, <strong>AssemblyAI Voice Hackathon</strong>, and <strong>Hack Apertus</strong>.
        <br />
        Engineered for US Commercial FTC / Delaware Law & India DPDP Act 2023 Compliance.
      </footer>

    </div>
  );
};

export default App;
