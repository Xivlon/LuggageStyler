# Switch from Cloudflare Workers to Pages

## Current Issue
You're in Cloudflare Workers dashboard, but we need Cloudflare Pages for static sites with serverless functions.

## Correct Setup Steps

### 1. Go to Cloudflare Pages (Not Workers)
- In Cloudflare Dashboard, click **"Pages"** in left sidebar
- NOT "Workers & Pages" > "Workers"
- Look for just **"Pages"**

### 2. Create New Pages Project
- Click **"Create a project"**
- Choose **"Connect to Git"**
- Select your GitHub repository
- Project name: `luggsters-website`

### 3. Build Configuration
- Framework preset: **None**
- Build command: **Leave empty or use:** `echo "Building static site"`
- Build output directory: `.`
- Root directory: **Leave empty**

### 4. Environment Variables (After Creation)
Once project is created:
- Go to project Settings > Environment variables
- Add: `RESEND_API_KEY` with your Resend API key
- Click **Save**

### 5. Custom Domain
- In your Pages project: Custom domains > Add domain
- Enter: `lugg-ster.com`
- Follow DNS setup instructions

## Why Pages Instead of Workers?
- **Pages**: Static sites + serverless functions (what we need)
- **Workers**: Pure serverless functions only
- Our setup needs both static HTML + API functions

## Expected Result
After Pages deployment:
- Static files served from root
- `/api/contact` handled by functions/api/contact.js
- Environment variables available to functions
- Contact form works on lugg-ster.com