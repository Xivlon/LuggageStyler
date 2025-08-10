# Cloudflare Pages Setup for lugg-ster.com

## Step 1: Connect Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Choose **Connect to Git**
5. Select your GitHub repository containing this code
6. Configure build settings:
   - **Project name**: `luggsters-website`
   - **Production branch**: `main`
   - **Build command**: `echo "Static site with functions"`
   - **Build output directory**: `.`
   - **Root directory**: `/` (leave empty)

## Step 2: Environment Variables

In your Cloudflare Pages project:
1. Go to **Settings** → **Environment variables**
2. Click **Add variable**
3. Add: `RESEND_API_KEY` = `your_resend_api_key_value`
4. Save changes

## Step 3: Custom Domain Configuration

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `lugg-ster.com`
4. If domain is already on Cloudflare:
   - Cloudflare will automatically configure DNS
   - CNAME record will point to your Pages deployment
5. If domain is external:
   - Follow the DNS instructions provided
   - Add CNAME record pointing to your Pages URL

## Step 4: Deploy

- Cloudflare will automatically deploy when you push to main branch
- Or manually trigger deployment from Pages dashboard
- Functions will be available at `/api/contact`

## What's Configured

✅ **Functions**: `/functions/api/contact.js` handles form submissions
✅ **Routing**: `_routes.json` ensures API calls go to functions
✅ **CORS**: `_headers` file configures cross-origin headers
✅ **Environment**: Secure RESEND_API_KEY handling

## Expected Result

After deployment:
- `lugg-ster.com` serves your website
- `lugg-ster.com/api/contact` handles form submissions
- Emails sent to your Gmail account
- Contact form works identically to development

## Verification

Test the contact form at `lugg-ster.com` - it should:
1. Show loading state when submitting
2. Display success message
3. Send email to nuruddinsattar@gmail.com
4. Reset form after successful submission