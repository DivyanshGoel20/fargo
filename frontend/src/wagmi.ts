import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, polygon, base, mainnet, baseSepolia } from 'wagmi/chains';
import { defineChain } from 'viem';

// Define Somnia Mainnet
export const somniaMainnet = defineChain({
  id: 5031,
  name: 'Somnia Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'SOMI',
    symbol: 'SOMI',
  },
  rpcUrls: {
    default: {
      http: ['https://api.infra.mainnet.somnia.network'],
    },
    public: {
      http: ['https://api.infra.mainnet.somnia.network'],
    },
  },
  blockExplorers: {
    default: { name: 'Somnia Explorer', url: 'https://explorer.somnia.network' },
  },
  testnet: false,
});

// Define Somnia Testnet
export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnianetwork'],
    },
    public: {
      http: ['https://dream-rpc.somnianetwork'],
    },
  },
  blockExplorers: {
    default: { name: 'Somnia Testnet Explorer', url: 'https://testnet-explorer.somnia.network' },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'Multi-Chain NFT dApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [arbitrum, polygon, base, baseSepolia, mainnet, somniaMainnet, somniaTestnet],
  ssr: false,
});
