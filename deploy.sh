#!/bin/bash

# Cloudflare deployment script for Luggsters

echo "🚀 Starting Cloudflare deployment for Luggsters..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Login check
echo "Checking Cloudflare authentication..."
wrangler whoami

# Deploy to staging first
echo "📦 Deploying to staging environment..."
wrangler deploy --env staging

# Ask for production deployment
read -p "Deploy to production? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Deploying to production..."
    wrangler deploy --env production
    echo "✅ Production deployment complete!"
else
    echo "⏭️  Skipping production deployment"
fi

# Deploy static files to Cloudflare Pages
echo "📄 Deploying static files to Cloudflare Pages..."
wrangler pages deploy . --project-name luggsters-website

echo "🎉 Deployment complete!"
echo "📋 Next steps:"
echo "1. Configure your domain in Cloudflare dashboard"
echo "2. Set environment variables (STRIPE_SECRET_KEY, VITE_STRIPE_PUBLIC_KEY)"
echo "3. Update DNS records to point to your Cloudflare deployment"