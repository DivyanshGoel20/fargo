import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, polygon, base, mainnet, baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Multi-Chain NFT dApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [arbitrum, polygon, base, baseSepolia, mainnet],
  ssr: false,
});
