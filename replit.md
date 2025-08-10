# Luggsters, Inc. - The Drivers Company

## Overview

Luggsters is a revolutionary Uber-style platform created exclusively for the pick-up and delivery of luggage. The company partners with trusted drivers—Luggsters—to ensure a smooth, professional, and efficient experience for travelers. The platform operates as a driver recruitment and management website, focusing on building a nationwide network of luggage delivery professionals.

## System Architecture

### Static Website Architecture
The application is a single-page static website designed for driver recruitment:

1. **Static Landing Page**: HTML/CSS website showcasing the driver platform and recruitment process
2. **Driver-Focused Content**: Information about joining the Luggster network, earnings, and requirements

### Frontend Architecture
- **Landing Page**: Pure HTML5 with inline CSS, featuring dark theme design with green gradient accents
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Driver-Focused UI**: Clean interface highlighting driver opportunities and earning potential
- **Contact Integration**: Contact form and multiple communication channels

## Key Components

### Core Application Structure
```
/
├── index.html                  # Main driver recruitment landing page
├── assets/                     # Images, videos, and static assets
│   ├── luggsters-logo.png     # Company logo
│   ├── background-video.mp4   # Hero section video
│   └── *.webp, *.jpg          # Background images
├── wrangler.toml              # Cloudflare deployment configuration
├── wrangler.json              # Legacy Cloudflare configuration
├── .github/workflows/         # GitHub Actions for deployment
└── attached_assets/           # Configuration and backup files
```

### Key Sections
- **Hero Section**: Company introduction and value proposition
- **About Section**: Company history, operating locations, and driver opportunities
- **Sign Up Section**: Driver membership plans and requirements
- **Contact Section**: Multiple contact channels and social media links

## Business Model

1. **Driver Recruitment**: Potential drivers visit the website to learn about opportunities
2. **Application Process**: Drivers apply through the Luggster mobile app
3. **Membership Structure**: 
   - Monthly: $9.99/month (automatically debited)
   - Annual: $120/year (save $24 annually)
4. **Earning Model**: Drivers earn 45% of delivery fee for each trip leg
5. **Service Areas**: Currently operating in Orlando FL, Atlanta GA, and Miami FL

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **@radix-ui/***: Unstyled, accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling with validation
- **zod**: Runtime type validation and schema definition
- **express**: Web framework for Node.js backend

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **esbuild**: Fast JavaScript bundler
- **tsx**: TypeScript execution environment

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with hot module replacement
- **Backend**: Express.js server with TypeScript compilation via tsx
- **Database**: PostgreSQL via Neon serverless platform
- **Port Configuration**: Configurable port setup for development

### Production Build
- **Frontend Build**: `vite build` compiles React app to static files
- **Backend Build**: `esbuild` bundles server code for production
- **Asset Management**: Static assets served via Express.js
- **Database Migrations**: Drizzle migrations for schema management

### Storage Strategy
The application implements a flexible storage abstraction that supports:
- **In-Memory Storage**: For development and testing (MemStorage class)
- **Database Storage**: PostgreSQL via Drizzle ORM for production
- **Migration Path**: Easy transition from development to production storage

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
- June 27, 2025. Added membership signup page (membership.html) and linked monthly membership button to complete payment flow
- June 27, 2025. Created annual membership page (annual-membership.html) with enhanced features and savings benefits
- July 15, 2025. Removed payment system and membership pages
- July 15, 2025. Updated pricing buttons to show "Coming Soon" messages
- July 15, 2025. Cleaned up payment-related files and configurations
- July 15, 2025. Removed all pop-up alerts for cleaner user experience
- July 15, 2025. Added GitHub deployment configuration files (wrangler.toml, wrangler.json)
- August 10, 2025. Transformed website from travel service to driver recruitment platform
- August 10, 2025. Updated content to reflect Uber-style luggage delivery business model
- August 10, 2025. Added driver membership plans, requirements, and earning information
- August 10, 2025. Updated contact information and operating locations
- August 10, 2025. Implemented mobile accessibility shortcuts with quick action buttons, keyboard navigation, and enhanced mobile UX
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```