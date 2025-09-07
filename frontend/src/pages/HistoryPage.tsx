import { useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
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
  accessUrl?: string | null;
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
        const res = await fetch(`https://fargo-jkcv.onrender.com/api/history/${address}`);
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
                    {item.accessUrl || item.gatewayUrl ? (
                      <img src={item.accessUrl || item.gatewayUrl as string} alt={item.prompt} className="generated-image" style={{ maxHeight: '240px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Image unavailable</div>
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <MintButton imageUrl={(item.accessUrl || item.gatewayUrl) as string} />
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

// Simple mint modal + metadata uploader
function MintButton({ imageUrl }: { imageUrl: string }) {
  const { data: txHash, isPending, writeContract, error: writeError } = useWriteContract();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadataUrl, setMetadataUrl] = useState<string | null>(null);

  const onMint = async () => {
    setLoading(true);
    setError(null);
    setMetadataUrl(null);
    try {
      const res = await fetch('https://fargo-jkcv.onrender.com/api/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), image: imageUrl })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to upload metadata');
      }
      const data = await res.json();
      setMetadataUrl(data.ipfsUrl || data.gatewayUrl);
      console.log('Metadata uploaded:', data);
      const uri = data.ipfsUrl || data.gatewayUrl;
      setMetadataUrl(uri);
      if (chainId !== arbitrum.id) {
        try { switchChain({ chainId: arbitrum.id }); } catch {}
        // defer write until user switches manually; show hint
        alert('Please switch to Arbitrum One to mint. Network switch requested.');
      } else {
        try {
          writeContract({
            abi: [
              {
                "inputs": [ { "internalType": "string", "name": "tokenURI", "type": "string" } ],
                "name": "mintNFT",
                "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ],
            address: '0x5411F7EB719EAA802b4c5F3265f6d4a545663E87',
            functionName: 'mintNFT',
            args: [uri]
          });
        } catch (e) {
          console.error('Contract write failed:', e);
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
  };

  return (
    <>
      <button className="generate-button" style={{ width: 'auto' }} onClick={() => setOpen(true)}>
        Mint NFT
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
          <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: 20, width: 420, maxWidth: '90%' }}>
            <h3 style={{ color: 'white', marginBottom: 12 }}>Mint NFT</h3>
            <div style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 8 }}>Image</div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, wordBreak: 'break-all' }}>{imageUrl}</div>
            <div style={{ color: '#cbd5e1', fontSize: 12, marginTop: 8 }}>Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
            <div style={{ color: '#cbd5e1', fontSize: 12, marginTop: 8 }}>Description</div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
            {error && <div style={{ color: '#f87171', marginTop: 8 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="secondary-button" onClick={() => setOpen(false)}>Cancel</button>
              <button className={`generate-button ${loading ? 'disabled' : ''}`} disabled={loading || !name.trim() || !description.trim()} onClick={onMint}>
                {loading ? 'Uploading…' : 'Upload & Mint'}
              </button>
            </div>
            {metadataUrl && (
              <div style={{ color: '#cbd5e1', marginTop: 8, wordBreak: 'break-all' }}>Metadata: {metadataUrl}</div>
            )}
            {writeError && <div style={{ color: '#f87171', marginTop: 8 }}>Tx error: {String(writeError.message || writeError)}</div>}
            {isPending && <div style={{ color: '#cbd5e1', marginTop: 8 }}>Waiting for wallet confirmation…</div>}
            {isConfirming && <div style={{ color: '#cbd5e1', marginTop: 8 }}>Transaction pending…</div>}
            {isConfirmed && <div style={{ color: '#34d399', marginTop: 8 }}>Mint confirmed!</div>}
          </div>
        </div>
      )}
    </>
  );
}



