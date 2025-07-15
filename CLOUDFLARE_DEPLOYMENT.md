# Cloudflare Deployment Guide for Luggsters

This guide explains how to deploy the Luggsters website and payment system to Cloudflare.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally with `npm install -g wrangler`
3. **Stripe Account**: Get your API keys from [dashboard.stripe.com](https://dashboard.stripe.com)

## Deployment Options

### Option 1: Cloudflare Pages (Recommended for Static Site)

1. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

2. **Deploy to Pages**:
   ```bash
   wrangler pages deploy . --project-name luggsters-website
   ```

3. **Set Environment Variables** in Cloudflare Dashboard:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

### Option 2: Cloudflare Workers (For Dynamic Backend)

1. **Configure Account ID**: 
   Update `wrangler.toml` with your account ID from Cloudflare dashboard

2. **Deploy to Workers**:
   ```bash
   # Deploy to staging
   wrangler deploy --env staging
   
   # Deploy to production
   wrangler deploy --env production
   ```

3. **Set Secrets**:
   ```bash
   wrangler secret put STRIPE_SECRET_KEY
   wrangler secret put VITE_STRIPE_PUBLIC_KEY
   ```

### Option 3: Automated Deployment Script

Run the deployment script:
```bash
./deploy.sh
```

## Configuration Files

- **`wrangler.toml`**: Modern Cloudflare Workers configuration
- **`wrangler.json`**: Legacy configuration (fallback)
- **`_redirects`**: Cloudflare Pages routing rules
- **`workers-site/index.js`**: Workers site handler with payment processing
- **`.github/workflows/cloudflare-pages.yml`**: GitHub Actions deployment

## Environment Variables

Set these in your Cloudflare dashboard:

### Required
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_`)
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key (starts with `pk_`)

### Optional
- `ENVIRONMENT`: `development`, `staging`, or `production`
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: API token for deployments

## Custom Domain Setup

1. **Add Domain** in Cloudflare Dashboard:
   - Go to your Cloudflare dashboard
   - Add your domain (e.g., `luggsters.com`)
   - Update nameservers to Cloudflare's

2. **Configure DNS**:
   - Create CNAME record: `www` → `luggsters-website.pages.dev`
   - Create CNAME record: `@` → `luggsters-website.pages.dev`

3. **SSL Setup**:
   - Enable "Always Use HTTPS" in SSL/TLS settings
   - Set SSL mode to "Full (strict)"

## Testing Deployment

1. **Health Check**:
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Payment Test**:
   - Visit your deployed site
   - Try the membership signup forms
   - Use Stripe test card: `4242 4242 4242 4242`

## Monitoring and Logs

- **Workers Logs**: Use `wrangler tail` to see real-time logs
- **Analytics**: Check Cloudflare dashboard for traffic and performance
- **Stripe Dashboard**: Monitor payments and webhooks

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `_redirects` file is properly configured
2. **Payment Failures**: Check Stripe keys are correctly set
3. **404 Errors**: Verify routing in `workers-site/index.js`

### Debug Commands

```bash
# Check authentication
wrangler whoami

# View logs
wrangler tail

# Test locally
wrangler pages dev .
```

## Production Checklist

- [ ] Domain configured and SSL enabled
- [ ] All environment variables set
- [ ] Stripe webhook endpoints configured
- [ ] Payment testing completed
- [ ] Error monitoring setup
- [ ] Backup and rollback plan ready

## Support

For deployment issues:
- Check Cloudflare documentation
- Review Wrangler CLI docs
- Test locally with `wrangler pages dev`