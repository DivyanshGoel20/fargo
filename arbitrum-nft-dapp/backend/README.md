# AI Image Generation Backend

This backend API handles AI image generation requests from the frontend React app.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file with your Gemini API key:
```bash
cp env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/generate-image
Generates an AI image based on a prompt and reference NFT images.

**Request Body:**
```json
{
  "prompt": "A futuristic cityscape with neon lights",
  "imageUrls": [
    "https://example.com/nft1.png",
    "https://example.com/nft2.png"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image generated successfully",
  "generatedImage": "data:image/svg+xml;base64...",
  "processedImages": 2
}
```

### GET /api/health
Health check endpoint.

## Features

- ✅ Converts all input images to PNG format using Sharp
- ✅ Handles multiple reference images
- ✅ Comprehensive logging for debugging
- ✅ Error handling and validation
- ✅ CORS enabled for frontend integration

## Note

Currently returns a placeholder image. In a production environment, you would integrate with an actual image generation service like DALL-E, Midjourney, or Stable Diffusion.
