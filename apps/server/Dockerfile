# --------------- WITH Bun ----------------

# direct: Stage Prod 
# FROM node:22-alpine AS base
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

# --------------- WITH npm ----------------

# =========== BASE ===========
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json bun.lock ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src

# =========== DEPENDENCIES ===========
FROM base AS deps
RUN npm install --omit=dev

# =========== BUILD PRISMA CLIENT ===========
FROM base AS prisma_generate
RUN npm install
RUN npx prisma generate
RUN npm run build

# =========== BASE ===========
FROM node:22-alpine AS prod
WORKDIR /app
# Mitaky libssl ho an’ny Prisma runtime
RUN apt-get update \
  && apt-get install -y libssl-dev dumb-init \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma_generate /app/dist ./dist
COPY --from=prisma_generate /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma_generate /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/main"]
