# DDL AI Teaching Studio - Backend Setup Guide

## Overview
This backend server securely handles API calls to Anthropic Claude API, keeping your API keys private.

## Prerequisites
- Node.js 14+ installed
- Anthropic API key from https://console.anthropic.com/keys
- npm or yarn

## Local Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

### Step 3: Add Your API Key
Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
PORT=3000
```

### Step 4: Start the Server
```bash
npm start
```

## API Endpoints

### Health Check
GET `/api/health`

### Generate Content
POST `/api/generate`
Request: `{ "prompt": "...", "max_tokens": 2000 }`
Response: `{ "success": true, "content": "..." }`

## Frontend Integration

Update your HTML callAI function:
```javascript
async function callAI(prompt){
  var backendUrl = 'http://localhost:3000/api/generate';
  var r=await fetch(backendUrl,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt:prompt,max_tokens:2000})
  });
  if(!r.ok) throw new Error('Generation failed');
  var d=await r.json();
  return d.content;
}
```

## Deployment Options

### Heroku
```bash
heroku create your-app-name
heroku config:set ANTHROPIC_API_KEY=your-key
git push heroku main
```

### Firebase Cloud Functions
```bash
npm install -g firebase-tools
firebase init functions
firebase deploy
```

### Vercel
```bash
npm install -g vercel
vercel
```

## Security Best Practices

✅ DO:
- Keep .env in .gitignore
- Use HTTPS in production
- Validate all inputs
- Set rate limiting

❌ DON'T:
- Commit .env to Git
- Expose API keys in code
- Allow unlimited requests
- Store sensitive data in browser

## Troubleshooting

**ANTHROPIC_API_KEY not set:**
- Ensure .env file exists
- Restart server after updating .env

**CORS errors:**
- Check backend CORS configuration
- Verify frontend URL is allowed

**Rate limit errors:**
- Check Anthropic account quota
- Wait before retrying

## Next Steps

1. Set up local backend
2. Update frontend HTML
3. Test locally
4. Deploy to production
5. Update frontend production URL
