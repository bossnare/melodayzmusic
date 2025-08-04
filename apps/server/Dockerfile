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

# Build Stage
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Mamorona Prisma client alohan’ny build
RUN npx prisma generate
RUN npm run build

# Production Stage
FROM node:18-slim AS runner
WORKDIR /usr/src/app
# Mitaky libssl ho an’ny Prisma runtime
RUN apt-get update \
  && apt-get install -y libssl-dev dumb-init \
  && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
ENV NODE_ENV production
EXPOSE 5000
CMD ["dumb-init", "node", "dist/main"]
