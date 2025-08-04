# --------------- WITH Bun ----------------

# =========== BASE ===========
FROM node:22-alpine AS base
# # # Bun installation # # #
RUN apk update && apk add --no-cache curl bash git && \
    curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    ln -s "$BUN_INSTALL/bin/bun" /usr/local/bin/bun && \
    bun --version

WORKDIR /app
COPY package*.json bun.lock ./
COPY prisma ./prisma
COPY . .

# =========== DEPENDENCIES ===========
FROM base AS deps
RUN bun install --omit=dev

# =========== BUILD PRISMA CLIENT ===========
FROM base AS prisma_generate
RUN bun install
RUN bun i -D prisma && bun install @prisma/client
RUN npx prisma generate
RUN bun run build

# =========== PRODUCTION ===========
FROM node:22-alpine AS prod
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma_generate /app/prisma ./prisma
COPY --from=prisma_generate /app/package.json ./
COPY --from=prisma_generate /app/dist ./dist

ENV NODE_ENV production
EXPOSE 5000
CMD ["npm", "run", "start:prod"]

# --------------- WITH npm ----------------

# =========== BASE ===========
# FROM node:22-alpine AS base
# WORKDIR /app
# COPY package*.json bun.lock ./
# COPY prisma ./prisma
# COPY . .

# # =========== DEPENDENCIES ===========
# FROM base AS deps
# RUN npm install --omit=dev

# # =========== BUILD PRISMA CLIENT ===========
# FROM base AS prisma_generate
# RUN npm install
# RUN npm i -D prisma
# RUN npx prisma generate
# RUN npm run build

# # =========== BASE ===========
# FROM node:22-alpine AS prod
# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=prisma_generate /app/prisma ./prisma
# COPY --from=prisma_generate /app/package.json ./
# COPY --from=prisma_generate /app/dist ./dist

# ENV NODE_ENV production
# EXPOSE 5000
# CMD ["npm", "run", "start:prod"]
