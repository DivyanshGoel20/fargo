# AI NFT Generator

A React-based dApp that allows users to generate AI-powered images and music inspired by their NFT collections. Built with React, TypeScript, Vite, and Web3 integration.

## Features

- 🎨 **AI Image Generation** - Generate stunning images inspired by your NFTs
- 🎵 **AI Music Generation** - Create unique music tracks based on your NFT characteristics
- 🔗 **Web3 Integration** - Connect your wallet and view your NFT collection
- 🖼️ **NFT Gallery** - Browse and select NFTs from your collection
- ⚡ **Real-time Generation** - Live preview and generation status

## Quick Start

### Prerequisites
- Node.js 18+ 
- A Gemini API key (for AI generation)

### Setup

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd arbitrum-nft-dapp
npm install
```

2. **Set up the backend:**
```bash
cd backend
npm install
cp env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. **Start development servers:**
```bash
# Option 1: Use the startup script (Windows)
./start-dev.bat

# Option 2: Use the startup script (Mac/Linux)
chmod +x start-dev.sh
./start-dev.sh

# Option 3: Start manually
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

4. **Open your browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Usage

1. **Connect your wallet** using the wallet connection button
2. **Select NFTs** from your collection that you want to use as inspiration
3. **Enter a prompt** describing the image or music you want to generate
4. **Click Generate** and wait for the AI to create your content
5. **View results** on the dedicated results page

## Project Structure

```
arbitrum-nft-dapp/
├── src/                    # Frontend React app
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   └── ...
├── backend/               # Node.js API server
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
└── agents/               # Python AI scripts
    └── image-gen.py      # Image generation logic
```

## API Endpoints

- `POST /api/generate-image` - Generate AI images
- `GET /api/health` - Health check

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Wagmi, RainbowKit
- **Backend:** Node.js, Express, Sharp (image processing)
- **AI:** Google Gemini API
- **Web3:** Ethereum, Arbitrum network support

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
