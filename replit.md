# Luggsters - Worry Free Travel

## Overview

Luggsters is a comprehensive travel service application that provides luggage protection and worry-free travel solutions. The project consists of two main components: a static landing page and a full-stack membership portal. The application allows users to view travel services, select membership plans, and complete secure payment processing.

## System Architecture

### Hybrid Architecture Design
The application employs a hybrid architecture approach:

1. **Static Landing Page**: Simple HTML/CSS website for marketing and initial user engagement
2. **Full-Stack Membership Portal**: React-based application for membership management and payments

### Frontend Architecture
- **Landing Page**: Pure HTML5 with inline CSS, featuring dark theme design with green gradient accents
- **Membership Portal**: React 18 with TypeScript, using Vite for build tooling and development
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables and Luggsters brand colors
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching

### Backend Architecture
- **API Layer**: Express.js with TypeScript serving RESTful endpoints
- **Database Layer**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **Storage Abstraction**: Interface-based storage layer supporting both in-memory and database implementations
- **Request Validation**: Zod schemas for type-safe API request/response validation
- **Development Integration**: Vite middleware for hot module replacement

## Key Components

### Core Application Structure
```
/
├── index1.html                 # Static landing page
├── replit1.md                  # Previous documentation
├── MembershipPro/              # Full-stack membership portal
│   ├── client/                 # React frontend
│   ├── server/                 # Express.js backend
│   ├── shared/                 # Shared schemas and types
│   └── migrations/             # Database migrations
└── attached_assets/            # Configuration and asset files
```

### Database Schema
Three main database tables support the membership system:
- **users**: Basic user authentication with username/password
- **membership_plans**: Plan details including pricing, features, and validity periods
- **payments**: Payment records with cardholder information and status tracking

### Frontend Components
- **LuggstersLogo**: Reusable logo component with multiple sizes
- **PlanCard**: Interactive membership plan selection cards
- **PaymentForm**: Secure payment processing with form validation
- **Landing Page**: Static HTML with dark theme and gradient styling

## Data Flow

1. **Plan Discovery**: Users browse available membership plans via `/api/membership-plans`
2. **Plan Selection**: Individual plan details retrieved via `/api/membership-plans/:id`
3. **Payment Processing**: Secure form submission to `/api/payments` with comprehensive validation
4. **Form Validation**: 
   - Client-side validation using React Hook Form with Zod schemas
   - Server-side validation using shared Zod schemas
5. **Data Storage**: Payment records stored with status tracking and audit trail
6. **Success Handling**: Payment confirmation and membership activation

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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```