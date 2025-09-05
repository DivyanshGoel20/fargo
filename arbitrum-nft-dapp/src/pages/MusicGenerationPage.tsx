import { useAccount } from 'wagmi';
import { NFTGallery } from '../components/NFTGallery';
import './GenerationPage.css';

interface MusicGenerationPageProps {
  onBack: () => void;
}

export function MusicGenerationPage({ onBack }: MusicGenerationPageProps) {
  const { isConnected } = useAccount();

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <button onClick={onBack} className="breadcrumb-link">← Back to Home</button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">AI Music</span>
        </div>
        <h1>AI Music Generation</h1>
        <p>Create unique music tracks inspired by your NFT collection</p>
      </div>

      {!isConnected ? (
        <div className="connect-prompt">
          <div className="prompt-card">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your wallet to view your NFTs and start generating AI music</p>
          </div>
        </div>
      ) : (
        <div className="content-section">
          <div className="nft-selection">
            <h2>Your NFTs</h2>
            <p>Select NFTs to inspire your AI-generated music composition</p>
            <NFTGallery />
          </div>
          
          <div className="generation-panel">
            <h3>AI Music Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Genre</label>
                <select>
                  <option>Electronic</option>
                  <option>Ambient</option>
                  <option>Hip-Hop</option>
                  <option>Classical</option>
                  <option>Jazz</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Duration</label>
                <select>
                  <option>30 seconds</option>
                  <option>1 minute</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Mood</label>
                <select>
                  <option>Energetic</option>
                  <option>Calm</option>
                  <option>Mysterious</option>
                  <option>Uplifting</option>
                </select>
              </div>
            </div>
            <button className="generate-button">
              Generate AI Music
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
