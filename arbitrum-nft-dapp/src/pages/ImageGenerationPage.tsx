import { useAccount } from 'wagmi';
import { NFTGallery } from '../components/NFTGallery';
import { Link } from 'react-router-dom';
import './GenerationPage.css';

export function ImageGenerationPage() {
  const { isConnected } = useAccount();

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">AI Images</span>
        </div>
        <h1>AI Image Generation</h1>
        <p>Select NFTs to generate stunning AI-powered images</p>
      </div>

      {!isConnected ? (
        <div className="connect-prompt">
          <div className="prompt-card">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your wallet to view your NFTs and start generating AI images</p>
          </div>
        </div>
      ) : (
        <div className="content-section">
          <div className="nft-selection">
            <h2>Your NFTs</h2>
            <p>Choose which NFTs you want to use as inspiration for AI image generation</p>
            <NFTGallery />
          </div>
          
          <div className="generation-panel">
            <h3>AI Image Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Style</label>
                <select>
                  <option>Realistic</option>
                  <option>Artistic</option>
                  <option>Abstract</option>
                  <option>Cartoon</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Resolution</label>
                <select>
                  <option>1024x1024</option>
                  <option>2048x2048</option>
                  <option>4096x4096</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Quality</label>
                <select>
                  <option>Standard</option>
                  <option>High</option>
                  <option>Ultra</option>
                </select>
              </div>
            </div>
            <button className="generate-button">
              Generate AI Images
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
