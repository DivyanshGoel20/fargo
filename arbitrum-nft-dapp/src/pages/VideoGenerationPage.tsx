import { useAccount } from 'wagmi';
import { NFTGallery } from '../components/NFTGallery';
import { Link } from 'react-router-dom';
import './GenerationPage.css';

export function VideoGenerationPage() {
  const { isConnected } = useAccount();

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">AI Videos</span>
        </div>
        <h1>AI Video Generation</h1>
        <p>Transform your NFTs into dynamic videos and animations</p>
      </div>

      {!isConnected ? (
        <div className="connect-prompt">
          <div className="prompt-card">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your wallet to view your NFTs and start generating AI videos</p>
          </div>
        </div>
      ) : (
        <div className="content-section">
          <div className="nft-selection">
            <h2>Your NFTs</h2>
            <p>Choose which NFTs you want to animate and turn into videos</p>
            <NFTGallery />
          </div>
          
          <div className="generation-panel">
            <h3>AI Video Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Animation Style</label>
                <select>
                  <option>Floating</option>
                  <option>Rotating</option>
                  <option>Morphing</option>
                  <option>Particle Effects</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Duration</label>
                <select>
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                  <option>15 seconds</option>
                  <option>30 seconds</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Quality</label>
                <select>
                  <option>720p</option>
                  <option>1080p</option>
                  <option>4K</option>
                </select>
              </div>
            </div>
            <button className="generate-button">
              Generate AI Videos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
