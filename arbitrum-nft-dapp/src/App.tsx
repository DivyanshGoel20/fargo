import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';
import { WalletConnection } from './components/WalletConnection';
import { NFTGallery } from './components/NFTGallery';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="App">
            <header className="App-header">
              <div className="header-content">
                <div className="title-section">
                  <h1>Arbitrum NFT dApp</h1>
                  <p>Connect your wallet to get started</p>
                </div>
                <div className="wallet-section-header">
                  <WalletConnection />
                </div>
              </div>
            </header>
            <main className="App-main">
              <NFTGallery />
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
