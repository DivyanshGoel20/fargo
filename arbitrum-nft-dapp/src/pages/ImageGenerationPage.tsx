import { useAccount } from 'wagmi';
import { NFTGallery } from '../components/NFTGallery';
import './GenerationPage.css';

interface ImageGenerationPageProps {
  onBack: () => void;
}

export function ImageGenerationPage({ onBack }: ImageGenerationPageProps) {
  const { isConnected } = useAccount();

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <button onClick={onBack} className="breadcrumb-link">← Back to Home</button>
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
            <h3>AI Image Generation</h3>
            <div className="prompt-section">
              <label htmlFor="image-prompt">Describe the image you want to generate:</label>
              <textarea
                id="image-prompt"
                className="prompt-textarea"
                placeholder="e.g., A futuristic cityscape with neon lights, inspired by cyberpunk aesthetics..."
                rows={4}
              />
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
