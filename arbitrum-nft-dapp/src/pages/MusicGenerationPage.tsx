import { useAccount } from 'wagmi';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import type { AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import './GenerationPage.css';

interface MusicGenerationPageProps {
  onBack: () => void;
}

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en'
};

const style = { width: '100%', height: '80vh', border: 'none' } as const;

export function MusicGenerationPage({ onBack }: MusicGenerationPageProps) {
  const { isConnected } = useAccount();

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(`Avatar URL is: ${event.data.url}`);
  };

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
          <div className="generated-image-container">
            <AvatarCreator 
              subdomain={"3d-character-bvzqar"}
              config={config}
              style={style}
              onAvatarExported={handleOnAvatarExported}
            />
          </div>
        </div>
      )}
    </div>
  );
}
