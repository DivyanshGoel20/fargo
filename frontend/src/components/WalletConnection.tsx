import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import './WalletConnection.css';

export function WalletConnection() {
  const { address, isConnected, chain } = useAccount();

  return (
    <div className="wallet-section">
      <ConnectButton />
      {/* {isConnected && (
        <div className="wallet-info">
          <p><strong>Connected:</strong> {address}</p>
          <p><strong>Network:</strong> {chain?.name || 'Unknown'}</p>
          <p><strong>Chain ID:</strong> {chain?.id}</p>
        </div>
      )} */}
    </div>
  );
}
