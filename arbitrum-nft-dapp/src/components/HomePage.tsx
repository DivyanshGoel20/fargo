import { useState, lazy, Suspense } from 'react';
import { ImageGenerationPage } from '../pages/ImageGenerationPage';
import { HistoryPage } from '../pages/HistoryPage';
import './HomePage.css';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'image') {
    return <ImageGenerationPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'avatar') {
    const Creator = lazy(() => import('../pages/AvatarCreatorPage'));
    return (
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>Loading Character Builder…</div>}>
        <Creator onBack={() => setCurrentPage('home')} />
      </Suspense>
    );
  }
  
  if (currentPage === 'history') {
    return <HistoryPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>AI-Powered NFT Generator</h1>
        <p>Transform your NFTs into AI-generated images and 3D characters</p>
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

        <div className="option-card avatar-card" onClick={() => setCurrentPage('avatar')}>
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

// Local component to handle creator -> viewer transition without introducing global routing
// removed AvatarRoute; creator is a single-step now per user request
