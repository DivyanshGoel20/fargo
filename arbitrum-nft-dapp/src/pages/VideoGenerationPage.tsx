import { useAccount } from 'wagmi';
import { useState } from 'react';
import { NFTGallery } from '../components/NFTGallery';
import './GenerationPage.css';

interface VideoGenerationPageProps {
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

export function VideoGenerationPage({ onBack }: VideoGenerationPageProps) {
  const { isConnected } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
  const [prompt, setPrompt] = useState('');

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <button onClick={onBack} className="breadcrumb-link">← Back to Home</button>
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
            <NFTGallery 
              onSelectionChange={setSelectedNFTs}
              selectionMode={true}
            />
          </div>
          
          <div className="generation-panel">
            <h3>AI Video Generation</h3>
            <div className="prompt-section">
              <label htmlFor="video-prompt">Describe the video you want to generate:</label>
              <textarea
                id="video-prompt"
                className="prompt-textarea"
                placeholder="e.g., A dynamic animation of swirling particles forming a galaxy, with smooth camera movement..."
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <button 
              className="generate-button"
              onClick={() => {
                console.log('=== AI VIDEO GENERATION ===');
                console.log('Selected NFTs:', selectedNFTs);
                console.log('Prompt:', prompt);
                console.log('Image URLs:');
                selectedNFTs.forEach((nft, index) => {
                  console.log(`${index + 1}. ${nft.name || `#${nft.identifier}`}: ${nft.image_url}`);
                });
                console.log('========================');
              }}
            >
              Generate AI Videos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
