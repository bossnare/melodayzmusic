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

# =========== DEPENDENCIES & BUILD ===========
FROM base AS build
COPY package*.json bun.lock ./
COPY prisma ./prisma

# Installer toutes les dépendances (dev et prod) pour la génération Prisma et le build
RUN bun install

# Générer le client Prisma
RUN npx prisma generate

# Copier le code source et builder
COPY . .
RUN bun run build

# =========== PRODUCTION ===========
FROM node:22-alpine AS prod

# Installer Bun dans l'étape de production aussi
RUN apk update && apk add --no-cache curl bash && \
    curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    ln -s "$BUN_INSTALL/bin/bun" /usr/local/bin/bun

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json bun.lock ./

# Installer seulement les dépendances de production avec Bun
RUN bun install --production

# Copier les fichiers nécessaires depuis l'étape build
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Régénérer le client Prisma en production (important !)
RUN npx prisma generate

ENV NODE_ENV=production
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
