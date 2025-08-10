# Production Deployment Instructions

## Option 1: Cloudflare Pages with Functions (Recommended)

### Step 1: Setup Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** > **Create a project**
3. Connect your GitHub repository
4. Set project name: `luggsters-website`
5. Build settings:
   - Build command: `echo "Static site with functions"`
   - Build output directory: `.`

### Step 2: Configure Environment Variables
In Cloudflare Pages dashboard, go to **Settings** > **Environment variables**:
- Add `RESEND_API_KEY` with your Resend API key value

### Step 3: Custom Domain
1. In Cloudflare Pages, go to **Custom domains**
2. Add `lugg-ster.com` as custom domain
3. Follow DNS setup instructions

### Step 4: Deploy
- Push code to main branch, or
- Use manual deployment: `wrangler pages deploy . --project-name=luggsters-website`

## Option 2: Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
vercel --prod
```

### Step 3: Environment Variables
Add `RESEND_API_KEY` in Vercel dashboard under Settings > Environment Variables

## What's Configured

✅ **Cloudflare Pages Functions**: `/functions/api/contact.js` handles form submissions
✅ **CORS Headers**: Proper cross-origin support via `_headers` file
✅ **Resend Integration**: Email sending functionality
✅ **Environment Variables**: Secure API key handling
✅ **GitHub Actions**: Automated deployment workflow

## Testing Production

After deployment, the contact form will work on `lugg-ster.com` with:
- Form submissions sent to `nuruddinsattar@gmail.com`
- Proper error handling and success messages
- Mobile accessibility shortcuts
- Full responsive design

## Benefits

- **Serverless**: No server maintenance required
- **Fast**: Edge-deployed functions worldwide
- **Secure**: Environment variables protected
- **Scalable**: Handles traffic spikes automatically
- **Cost-effective**: Pay only for usage