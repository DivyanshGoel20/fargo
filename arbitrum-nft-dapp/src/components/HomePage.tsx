import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>AI-Powered NFT Generator</h1>
        <p>Transform your NFTs into AI-generated images, videos, and music</p>
      </div>
      
      <div className="options-grid">
        <Link to="/generate/image" className="option-card image-card">
          <div className="card-icon">🎨</div>
          <h2>AI Images</h2>
          <p>Generate stunning images inspired by your NFTs using advanced AI</p>
          <div className="card-features">
            <span>• Style Transfer</span>
            <span>• Art Generation</span>
            <span>• High Resolution</span>
          </div>
        </Link>

        <Link to="/generate/video" className="option-card video-card">
          <div className="card-icon">🎬</div>
          <h2>AI Videos</h2>
          <p>Create dynamic videos and animations from your NFT collection</p>
          <div className="card-features">
            <span>• Motion Graphics</span>
            <span>• Animation</span>
            <span>• 4K Quality</span>
          </div>
        </Link>

        <Link to="/generate/music" className="option-card music-card">
          <div className="card-icon">🎵</div>
          <h2>AI Music</h2>
          <p>Compose unique music tracks based on your NFT characteristics</p>
          <div className="card-features">
            <span>• Genre Mixing</span>
            <span>• Custom Beats</span>
            <span>• High Quality Audio</span>
          </div>
        </Link>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Wallet</h3>
            <p>Connect your wallet to access your NFT collection</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select NFTs</h3>
            <p>Choose which NFTs you want to use as inspiration</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate Content</h3>
            <p>Let AI create amazing content based on your NFTs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
