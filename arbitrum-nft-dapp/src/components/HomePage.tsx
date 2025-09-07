import { useState } from 'react';
import { ImageGenerationPage } from '../pages/ImageGenerationPage';
import { MusicGenerationPage } from '../pages/MusicGenerationPage';
import './HomePage.css';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'image') {
    return <ImageGenerationPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'music') {
    return <MusicGenerationPage onBack={() => setCurrentPage('home')} />;
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
          <div className="card-icon">🎵</div>
          <h2>AI Music</h2>
          <p>Compose unique music tracks based on your NFT characteristics</p>
          <div className="card-features">
            <span>• Genre Mixing</span>
            <span>• Custom Beats</span>
            <span>• High Quality Audio</span>
          </div>
        </div>
      </div>

    </div>
  );
}
