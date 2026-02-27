# ============================================================
# Stage 1: BUILD
# Uses full node:20 for native compilation (@swc/core, better-sqlite3)
# ============================================================
FROM node:20 AS build

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for strapi build)
RUN npm ci

# Copy source code
COPY . .

# Build Strapi with production optimizations
ENV NODE_ENV=production
RUN npm run build

# ============================================================
# Stage 2: PRODUCTION
# Uses node:20-slim (Debian-based, NOT Alpine) for smaller image
# with working native bindings
# ============================================================
FROM node:20-slim AS production

# Install runtime dependencies:
# - libvips42: required by Strapi for image processing (sharp)
# - openssl: required for SSL connections to PostgreSQL
# - curl: required for health check
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      libvips42 \
      openssl \
      curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built artifacts from build stage
# dist/ contains compiled JS (config, src, build/admin panel)
COPY --from=build /app/dist ./dist
# TypeScript source files needed by strapi start for compilation check
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/config ./config
COPY --from=build /app/src ./src
# database/ contains migration files
COPY --from=build /app/database ./database
# public/ contains static assets and favicon
COPY --from=build /app/public ./public
COPY --from=build /app/favicon.png ./favicon.png

# Create uploads directory (will be mounted as a volume on Railway)
RUN mkdir -p /app/public/uploads && chown -R node:node /app/public/uploads

# Environment defaults (overridden by Railway env vars)
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Use non-root user for security
USER node

EXPOSE 1337

# Health check inside the container
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
  CMD curl -f http://localhost:1337/_health || exit 1

CMD ["npm", "run", "start"]
