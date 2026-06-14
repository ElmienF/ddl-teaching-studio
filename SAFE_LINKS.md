# DDL AI Teaching Studio - Safe Platform Links

## Main Application Link
**Universal/Web-Safe Link:**
```
https://ddl-ai-studio.web.app
```

## Recommended Link Format by Platform

### Social Media & Messaging
- **Facebook, Instagram, Twitter/X, LinkedIn:**
```
DDL AI Teaching Studio - Create AI-powered lessons instantly
https://ddl-ai-studio.web.app
```

- **WhatsApp, Telegram, SMS:**
```
DDL AI Studio: https://ddl-ai-studio.web.app
```

### Email
```html
<a href="https://ddl-ai-studio.web.app" target="_blank">
  Visit DDL AI Teaching Studio
</a>
```

### QR Code Target
Point QR codes to:
```
https://ddl-ai-studio.web.app
```

### Landing Page CTA
```html
<a href="https://ddl-ai-studio.web.app/signup" class="btn">
  Start Building Free
</a>
```

## Payment & Support Links

### PayPal Payment Links
- Starter (30 dollars): https://www.paypal.me/ElmienFlemming/30.00
- Growth (50 dollars): https://www.paypal.me/ElmienFlemming/50.00
- Pro (70 dollars): https://www.paypal.me/ElmienFlemming/70.00
- Complete (100 dollars): https://www.paypal.me/ElmienFlemming/100.00

### Support Email
```
elmien.flemming1@gmail.com
```

## Security Notes

Safe for All Platforms:
- HTTPS protocol (not HTTP)
- No API keys in URLs
- No sensitive data exposed
- Mobile-friendly redirect
- Cross-platform compatible

Current Security Issues to Fix:

1. API Key Exposed in Code
   Action Required: 
   - Revoke this API key immediately in Anthropic dashboard
   - Move to backend environment variables
   - Generate new API key

2. Direct Browser API Calls
   Action Required: Use backend proxy instead of direct browser access

## Recommended Implementation

### Step 1: Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Step 2: Create Backend Proxy
Move API calls to Node.js/Python backend to hide API keys and manage rate limiting.

### Step 3: Update Links
Replace direct HTML file links with your deployed domain.

---

Status: Ready for safe platform distribution once backend security is implemented.