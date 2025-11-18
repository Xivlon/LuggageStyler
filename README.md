# Luggsters - The Drivers Company

![Luggsters Logo](./assets/luggsters-logo.png)

## Overview

Luggsters is a revolutionary Uber-style platform created exclusively for the pick-up and delivery of luggage. The company partners with trusted drivers—Luggsters—to ensure a smooth, professional, and efficient experience for travelers. This repository contains the driver recruitment and information website.

## Features

- **Driver Recruitment Landing Page**: Information about becoming a Luggster driver
- **Membership Plans**: Monthly ($9.99/month) and Annual ($120/year) options
- **Contact Form**: Integrated contact form with email delivery via Resend API
- **Responsive Design**: Mobile-first design with accessibility features
- **Serverless Functions**: Cloudflare Pages Functions for backend API

## Technology Stack

### Frontend
- Pure HTML5, CSS3, and JavaScript
- Modern responsive design with CSS Grid and Flexbox
- Dark theme with green gradient accents

### Backend
- **Development**: Express.js server (Node.js)
- **Production**: Cloudflare Pages with serverless functions
- **Email**: Resend API for contact form submissions

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Resend API key (for contact form functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Xivlon/LuggageStyler.git
cd LuggageStyler
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
export RESEND_API_KEY=your_resend_api_key_here
```

### Development

Run the development server:
```bash
node server.js
```

The website will be available at `http://localhost:5000`

## Deployment

### Cloudflare Pages (Recommended)

1. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** > **Create a project**
   - Connect your GitHub repository
   - Project name: `luggsters-website`

2. **Build Configuration**:
   - Build command: Leave empty or `echo "Static site with functions"`
   - Build output directory: `.`
   - Root directory: Leave empty

3. **Environment Variables**:
   - In Settings > Environment variables, add:
     - `RESEND_API_KEY`: Your Resend API key

4. **Custom Domain**:
   - Add `lugg-ster.com` in Custom domains section
   - Follow DNS configuration instructions

### Manual Deployment

Using Wrangler CLI:
```bash
# Install Wrangler
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=luggsters-website

# Add environment variable
wrangler pages secret put RESEND_API_KEY --project-name=luggsters-website
```

## Project Structure

```
.
├── index.html              # Main landing page
├── server.js               # Express development server
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       └── contact.js      # Contact form API endpoint
├── assets/                 # Images and media files
├── wrangler.toml          # Cloudflare configuration
├── _headers               # CORS and security headers
├── _routes.json           # API routing configuration
└── package.json           # Node.js dependencies
```

## API Endpoints

### POST /api/contact
Submit contact form data and send email notification.

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

## Business Information

### Service Areas
- Orlando, FL
- Atlanta, GA
- Miami, FL

### Membership Plans
- **Monthly**: $9.99/month (automatically debited)
- **Annual**: $120/year (save $24 annually)

### Driver Earnings
Drivers earn 45% of the delivery fee for each trip leg.

## Contact

- **Website**: [lugg-ster.com](https://lugg-ster.com)
- **Email**: nuruddinsattar@gmail.com
- **Phone**: (407) 494-8044

## License

All rights reserved. This is proprietary software for Luggsters, Inc.

## Changelog

- **August 10, 2025**: Transformed to driver recruitment platform
- **July 15, 2025**: Removed payment system, added "Coming Soon" for memberships
- **June 27, 2025**: Initial setup with membership signup functionality
