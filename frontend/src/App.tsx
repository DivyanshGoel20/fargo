import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';
import { WalletConnection } from './components/WalletConnection';
import { HomePage } from './components/HomePage';
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
                  <h1>Fargo</h1>
                  <p>Turn Your Digital Collection into AI-Generated Masterpieces.</p>
                </div>
                <div className="wallet-section-header">
                  <WalletConnection />
                </div>
              </div>
            </header>
            <main className="App-main">
              <HomePage />
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
