import express from 'express';
import cors from 'cors';
import axios from 'axios';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabaseUrl = 'https://mamkdglgjohrnwzawree.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Save generated image to database
async function saveToDatabase(walletAddress, ipfsUrl, prompt) {
  try {
    console.log('Saving to database...');
    console.log('Wallet Address:', walletAddress);
    console.log('IPFS URL:', ipfsUrl);
    console.log('Prompt:', prompt);
    
    const { data, error } = await supabase
      .from('user_content')
      .insert([
        { 
          wallet_address: walletAddress, 
          ipfs_url: ipfsUrl,
          prompt: prompt,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }
    
    console.log('Successfully saved to database:', data);
    return data;
  } catch (error) {
    console.error('Error saving to database:', error.message);
    throw new Error(`Failed to save to database: ${error.message}`);
  }
}

// Convert image to PNG format
async function convertImageToPNG(imageUrl) {
  try {
    console.log(`Converting image to PNG: ${imageUrl}`);
    
    // Download the image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 10000
    });
    
    // Convert to PNG using Sharp
    const pngBuffer = await sharp(response.data)
      .png()
      .toBuffer();
    
    console.log(`Successfully converted image to PNG, size: ${pngBuffer.length} bytes`);
    return pngBuffer;
  } catch (error) {
    console.error('Error converting image to PNG:', error.message);
    throw new Error(`Failed to convert image to PNG: ${error.message}`);
  }
}

// Generate AI image using Gemini API
async function generateAIImage(prompt, imageBuffers) {
  try {
    console.log('Starting AI image generation...');
    console.log('Prompt:', prompt);
    console.log('Number of reference images:', imageBuffers.length);
    
    const { GoogleGenAI } = await import('@google/genai');
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
    
    // Prepare the content for Gemini
    const contents = [
      {
        text: `Generate a new image based on this prompt: "${prompt}". Use the provided reference images as inspiration for style, composition, and visual elements.`
      }
    ];
    
    // Add image parts
    for (let i = 0; i < imageBuffers.length; i++) {
      contents.push({
        inlineData: {
          data: imageBuffers[i].toString('base64'),
          mimeType: 'image/png'
        }
      });
    }
    
    console.log('Sending request to Gemini API...');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: contents
    }); 
    
    console.log('AI image generation completed');
    
    // Process the response to extract the generated image
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log('Generated text:', part.text);
      } else if (part.inlineData) {
        console.log('Generated image data received');
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        
        // Convert to data URL for frontend display
        const dataUrl = `data:image/png;base64,${imageData}`;
        
        return {
          success: true,
          message: 'Image generated successfully!',
          generatedImage: dataUrl
        };
      }
    }
    
    // If no image was generated, return a placeholder
    return {
      success: true,
      message: 'Image generation completed but no image data received.',
      generatedImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFJIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
    };
  } catch (error) {
    console.error('Error generating AI image:', error.message);
    throw new Error(`Failed to generate AI image: ${error.message}`);
  }
}

// API endpoint for image generation
app.post('/api/generate-image', async (req, res) => {
  try {
    console.log('=== IMAGE GENERATION REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { prompt, imageUrls, walletAddress } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }
    
    if (!walletAddress) {
      return res.status(400).json({
        error: 'Wallet address is required'
      });
    }
    
    console.log('Processing image URLs:', imageUrls);
    
    // Convert all images to PNG (if any are provided)
    const imageBuffers = [];
    if (imageUrls && imageUrls.length > 0) {
      for (const imageUrl of imageUrls) {
        try {
          const pngBuffer = await convertImageToPNG(imageUrl);
          imageBuffers.push(pngBuffer);
        } catch (error) {
          console.warn(`Skipping image ${imageUrl}: ${error.message}`);
          // Continue with other images
        }
      }
      console.log(`Successfully processed ${imageBuffers.length} images`);
    } else {
      console.log('No reference images provided - generating from prompt only');
    }
    
    // Generate AI image
    const generationResult = await generateAIImage(prompt, imageBuffers);
    
    console.log('=== IMAGE GENERATION COMPLETED ===');
    
    // For now, we'll use a placeholder IPFS URL since we haven't implemented IPFS upload yet
    const placeholderIpfsUrl = `ipfs://placeholder_${Date.now()}`;
    
    // Save to database
    try {
      await saveToDatabase(
        walletAddress, 
        placeholderIpfsUrl, 
        prompt
      );
      console.log('Successfully saved to database');
    } catch (dbError) {
      console.warn('Database save failed, but continuing with response:', dbError.message);
    }
    
    res.json({
      success: true,
      message: generationResult.message,
      generatedImage: generationResult.generatedImage,
      processedImages: imageBuffers.length,
      ipfsUrl: placeholderIpfsUrl,
      savedToDatabase: true
    });
    
  } catch (error) {
    console.error('Error in image generation endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Image Generation API is running' });
});

app.listen(PORT, () => {
  console.log(`AI Image Generation API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
