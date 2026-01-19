# replit.md

## Overview

A romantic Valentine's Day web application designed as a personalized digital love letter and wish board. The app features an interactive hero section with video background, animated floating hearts, a love letter reveal animation, a photo gallery of couple memories, and a community wishes/notes section where users can leave heartfelt messages stored in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for complex animations (floating hearts, scroll effects, envelope reveal)
- **Forms**: React Hook Form with Zod resolver for validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Design**: REST API with typed routes defined in `shared/routes.ts`
- **Validation**: Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (required via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with output to `./migrations` directory
- **Current Tables**: `wishes` table for storing user-submitted love notes

### Project Structure
```
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/   # UI components (shadcn + custom)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── pages/        # Route pages
├── server/          # Express backend
│   ├── db.ts        # Database connection
│   ├── routes.ts    # API route handlers
│   ├── storage.ts   # Data access layer
│   └── index.ts     # Server entry point
├── shared/          # Shared code between client/server
│   ├── schema.ts    # Drizzle database schemas
│   └── routes.ts    # Typed API route definitions
```

### Development vs Production
- **Development**: Uses Vite dev server with HMR, proxied through Express
- **Production**: Vite builds to `dist/public`, Express serves static files, server bundled with esbuild

### Path Aliases
- `@/*` maps to `./client/src/*`
- `@shared/*` maps to `./shared/*`
- `@assets` maps to `./attached_assets`

## External Dependencies

### Database
- **PostgreSQL**: Required database, connection via `DATABASE_URL` environment variable
- **Connection Pooling**: Uses `pg` Pool for database connections
- **Session Storage**: `connect-pg-simple` available for session management

### UI Component Library
- **shadcn/ui**: Full component suite installed with Radix UI primitives
- **Icons**: Lucide React for iconography
- **Fonts**: Google Fonts (Playfair Display, Lato, Great Vibes)

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod`: Database ORM and schema validation
- `@tanstack/react-query`: Data fetching and caching
- `framer-motion`: Animation library
- `react-hook-form` + `@hookform/resolvers`: Form handling
- `wouter`: Client-side routing
- `zod`: Schema validation

### External Media
- Background video from Mixkit CDN
- Stock photos from Unsplash
- Background audio from Pixabay

### Build Tooling
- Vite with React plugin
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)
- esbuild for server bundling with selective dependency bundling