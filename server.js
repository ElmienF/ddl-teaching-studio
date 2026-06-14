// DDL AI Teaching Studio - Secure Backend Server
// Handles all API calls with hidden API keys

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main API endpoint for AI generation
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, max_tokens = 2000 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not set in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Call Anthropic API
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': ANTHROPIC_API_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: max_tokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);

      if (response.status === 401) {
        return res.status(401).json({ error: 'API key invalid' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      if (response.status === 400) {
        return res.status(400).json({ error: error.error?.message || 'Invalid request' });
      }

      return res.status(500).json({ error: 'API Error: ' + (error.error?.message || response.statusText) });
    }

    const data = await response.json();
    const content = data.content.map(c => c.text).join('');

    res.json({
      success: true,
      content: content,
      usage: data.usage
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`DDL AI Studio backend running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/generate`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});