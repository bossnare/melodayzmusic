# --------------- WITH Bun ----------------

# direct: Stage Prod 
# FROM node:lts-alpine AS base
# # RUN corepack enable && corepack prepare pnpm@latest --activate
# # ----- Bun installation ------
# RUN apk update && apk add --no-cache curl bash git && \
#     curl -fsSL https://bun.sh/install | bash && \
#     export BUN_INSTALL="/root/.bun" && \
#     export PATH="$BUN_INSTALL/bin:$PATH" && \
#     ln -s "$BUN_INSTALL/bin/bun" /usr/local/bin/bun && \
#     bun --version

# # --- Create app directory
# WORKDIR /app

# # COPY lock file and deps descriptor before
# COPY bun.lock package.json ./

# # Install deps (cached)
# RUN bun install && \
#     echo "Bun dependencies installed successfully. ✅"

# # Copy Prisma schema
# COPY prisma ./prisma

# # copy the rest
# COPY . .

# # Prisma generate before build
# RUN npx prisma generate && \
#     echo 'Prisma generated successfully. ✅'

# # ensure ./src/generated/prisma  (debug)
# RUN ls -al ./src/generated/prisma

# # Build app
# RUN bun run build

# # ensure ./src/generated/prisma (debug)
# RUN ls -al ./src/generated/prisma

# # just declare it
# EXPOSE 5000

# # Run app
# CMD ["node", "dist/main"]

# --------------- WITH pnpm ----------------

FROM node:lts-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install ALL dependencies (including dev deps for build)
RUN pnpm install --frozen-lockfile && \
    echo "✅ Dependencies installed"

# Copy Prisma schema
COPY prisma ./prisma

# Clean any existing generated files and regenerate
RUN rm -rf node_modules/.prisma node_modules/@prisma/client/.prisma && \
    npx prisma generate && \
    echo "✅ Prisma client generated"

# Verify Prisma client exists
RUN ls -la node_modules/.prisma/client/ && \
    echo "✅ Prisma client files verified"

# Copy source code
COPY . .

# Debug: Check if types are available
RUN echo "Checking Prisma types..." && \
    node -e "console.log(require('@prisma/client'))" || echo "❌ Prisma client not found"

# Build
RUN pnpm build && \
    echo "✅ Build completed"

EXPOSE 5000

CMD ["node", "dist/main"]
