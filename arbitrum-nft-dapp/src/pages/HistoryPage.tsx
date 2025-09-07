import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import './GenerationPage.css';

interface HistoryPageProps {
  onBack: () => void;
}

interface HistoryItem {
  id: number;
  walletAddress: string;
  ipfsUrl: string;
  cid: string;
  gatewayUrl: string | null;
  prompt: string;
  createdAt: string;
}

export function HistoryPage({ onBack }: HistoryPageProps) {
  const { isConnected, address } = useAccount();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!address) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3001/api/history/${address}`);
        if (!res.ok) throw new Error('Failed to fetch history');
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [address]);

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <button onClick={onBack} className="breadcrumb-link">← Back to Home</button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Recent Works</span>
        </div>
        <h1>Recent Works</h1>
        <p>View images you generated along with their prompts</p>
      </div>

      {!isConnected ? (
        <div className="connect-prompt">
          <div className="prompt-card">
            <h2>Connect Your Wallet</h2>
            <p>Connect to view your generation history</p>
          </div>
        </div>
      ) : (
        <div className="content-section" style={{ gridTemplateColumns: '1fr' }}>
          {loading && <p>Loading history…</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {items.length === 0 && (
                <p>No items yet. Generate your first image!</p>
              )}
              {items.map((item) => (
                <div key={item.id} className="generated-image-container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1rem', alignItems: 'start' }}>
                  <div style={{ width: '240px' }}>
                    {item.gatewayUrl ? (
                      <img src={item.gatewayUrl} alt={item.prompt} className="generated-image" style={{ maxHeight: '240px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Image unavailable</div>
                    )}
                  </div>
                  <div>
                    <div style={{ color: '#cbd5e1', marginBottom: '0.25rem' }}>Prompt</div>
                    <div style={{ color: 'white', maxHeight: '120px', overflow: 'auto', paddingRight: '0.5rem' }}>{item.prompt}</div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <button className="generate-button" style={{ width: 'auto' }} disabled>
                        Mint (coming soon)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


