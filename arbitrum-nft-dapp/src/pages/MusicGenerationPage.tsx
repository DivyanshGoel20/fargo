import { useAccount } from 'wagmi';
import { useState } from 'react';
import { NFTGallery } from '../components/NFTGallery';
import './GenerationPage.css';

interface MusicGenerationPageProps {
  onBack: () => void;
}

interface NFT {
  identifier: string;
  name: string;
  description: string;
  image_url: string;
  collection: string;
  contract: string;
  token_standard: string;
  chain: string;
}

export function MusicGenerationPage({ onBack }: MusicGenerationPageProps) {
  const { isConnected } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('1 minute');

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
            <NFTGallery 
              onSelectionChange={setSelectedNFTs}
              selectionMode={true}
            />
          </div>
          
          <div className="generation-panel">
            <h3>AI Music Generation</h3>
            <div className="prompt-section">
              <label htmlFor="music-prompt">Describe the music you want to generate:</label>
              <textarea
                id="music-prompt"
                className="prompt-textarea"
                placeholder="e.g., An upbeat electronic track with synth melodies and driving bass, perfect for a futuristic atmosphere..."
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option>30 seconds</option>
                  <option>1 minute</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                </select>
              </div>
            </div>
            <button 
              className="generate-button"
              onClick={() => {
                console.log('=== AI MUSIC GENERATION ===');
                console.log('Selected NFTs:', selectedNFTs);
                console.log('Prompt:', prompt);
                console.log('Duration:', duration);
                console.log('Image URLs:');
                selectedNFTs.forEach((nft, index) => {
                  console.log(`${index + 1}. ${nft.name || `#${nft.identifier}`}: ${nft.image_url}`);
                });
                console.log('========================');
              }}
            >
              Generate AI Music
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
