#!/bin/bash

echo "🚀 Deploying Luggsters to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Deploy to Cloudflare Pages
echo "Deploying site..."
wrangler pages deploy . --project-name=luggsters-website

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to Cloudflare Pages dashboard"
echo "2. Add environment variable: RESEND_API_KEY"
echo "3. Configure custom domain: lugg-ster.com"
echo "4. Test contact form at your domain"