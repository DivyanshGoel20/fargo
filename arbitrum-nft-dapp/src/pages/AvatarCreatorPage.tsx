import { useEffect, useRef } from 'react';
import './GenerationPage.css';

interface AvatarCreatorPageProps { onBack: () => void; }

export default function AvatarCreatorPage({ onBack }: AvatarCreatorPageProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== 'readyplayerme') return;
      if (data.eventName === 'v1.frame.ready') {
        iframeRef.current?.contentWindow?.postMessage(
          { target: 'readyplayerme', type: 'subscribe', eventName: 'v1.avatar.exported' } as any,
          '*'
        );
      }
      if (data.eventName === 'v1.avatar.exported') {
        console.log(`Avatar URL is: ${data.data?.url}`);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

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

      <div className="content-section" style={{ gridTemplateColumns: '1fr', justifyItems: 'center' }}>
        <div className="generated-image-container" style={{ padding: 0, maxWidth: '960px', width: '100%' }}>
          <iframe
            ref={iframeRef}
            title="Ready Player Me Avatar Creator"
            src={'https://3d-character-bvzqar.readyplayer.me/avatar?frameApi=true&clearCache=1&bodyType=fullbody&language=en'}
            style={{ width: '100%', height: '100vh', border: 'none', borderRadius: '12px', display: 'block', margin: '0 auto' }}
            allow="camera *; microphone *; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
}


