# ====================================================
# Stage 1: Build Frontend SPA
# ====================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ====================================================
# Stage 2: Build Backend API Server
# ====================================================
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ ./
RUN npx prisma generate
RUN npm run build

# ====================================================
# Stage 3: Production Runner
# ====================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy built static frontend
COPY --from=frontend-builder /app/dist ./dist

# Set up backend runtime
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# Copy Prisma schema and client
COPY backend/prisma ./prisma
RUN npx prisma generate

# Copy compiled backend output
COPY --from=backend-builder /app/backend/dist ./dist

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
