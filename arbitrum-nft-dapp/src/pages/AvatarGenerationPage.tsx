import { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import './GenerationPage.css';

interface AvatarGenerationPageProps {
  onBack: () => void;
}

export function AvatarGenerationPage({ onBack }: AvatarGenerationPageProps) {
  const { isConnected } = useAccount();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;
      if (data.source !== 'readyplayerme') return;
      if (data.eventName === 'v1.avatar.exported') {
        console.log(`Avatar URL is: ${data.data?.url}`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const src = 'https://3d-character-bvzqar.readyplayer.me/avatar?frameApi=true';

  return (
    <div className="generation-page">
      <div className="page-header">
        <div className="breadcrumb">
          <button onClick={onBack} className="breadcrumb-link">← Back to Home</button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">3D Character</span>
        </div>
        <h1>Create 3D Character</h1>
        <p>Create and export a Ready Player Me avatar</p>
      </div>

      {!isConnected ? (
        <div className="connect-prompt">
          <div className="prompt-card">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your wallet to start creating your 3D avatar</p>
          </div>
        </div>
      ) : (
        <div className="content-section" style={{ gridTemplateColumns: '1fr' }}>
          <div className="generated-image-container" style={{ padding: 0 }}>
            <iframe
              ref={iframeRef}
              title="Ready Player Me Avatar Creator"
              src={src}
              style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '12px' }}
              allow="camera *; microphone *; clipboard-write"
            />
          </div>
        </div>
      )}
    </div>
  );
}


