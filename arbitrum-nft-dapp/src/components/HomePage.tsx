import { useState } from 'react';
import { ImageGenerationPage } from '../pages/ImageGenerationPage';
import { HistoryPage } from '../pages/HistoryPage';
import { AvatarGenerationPage } from '../pages/AvatarGenerationPage';
import './HomePage.css';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'image') {
    return <ImageGenerationPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'music') {
    return <AvatarGenerationPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'history') {
    return <HistoryPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>AI-Powered NFT Generator</h1>
        <p>Transform your NFTs into AI-generated images and music</p>
      </div>
      
      <div className="options-grid">
        <div className="option-card image-card" onClick={() => setCurrentPage('image')}>
          <div className="card-icon">🎨</div>
          <h2>AI Images</h2>
          <p>Generate stunning images inspired by your NFTs using advanced AI</p>
          <div className="card-features">
            <span>• Style Transfer</span>
            <span>• Art Generation</span>
            <span>• High Resolution</span>
          </div>
        </div>

        <div className="option-card music-card" onClick={() => setCurrentPage('music')}>
          <div className="card-icon">🧍</div>
          <h2>3D Characters</h2>
          <p>Create and export your Ready Player Me avatar</p>
          <div className="card-features">
            <span>• Full-body</span>
            <span>• Quick Start</span>
            <span>• Export URL</span>
          </div>
        </div>

        <div className="option-card image-card" onClick={() => setCurrentPage('history')}>
          <div className="card-icon">🗂️</div>
          <h2>Recent Works</h2>
          <p>Browse your generated images and prompts</p>
          <div className="card-features">
            <span>• View History</span>
            <span>• Open via Gateway</span>
            <span>• Mint (soon)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
