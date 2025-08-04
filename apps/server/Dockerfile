# --------------- WITH Bun ----------------

FROM node:22-alpine

# Installer Bun et les outils de debug
RUN apk update && apk add --no-cache curl bash git && \
    curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    ln -s "$BUN_INSTALL/bin/bun" /usr/local/bin/bun

WORKDIR /app

# Copier tous les fichiers
COPY . .

# Installer les dépendances
RUN bun install

# Générer le client Prisma avec debug
RUN npx prisma generate && \
    echo "✅ Prisma client generated" && \
    ls -la node_modules/.prisma/ && \
    ls -la node_modules/@prisma/

# Builder l'application
RUN bun run build && \
    echo "✅ Build completed" && \
    ls -la dist/

# Vérifier que tout est en place avant le démarrage
RUN echo "📋 Final check:" && \
    ls -la node_modules/.prisma/ && \
    ls -la dist/ && \
    echo "Ready to start!"

RUN echo "Check @prisma: 😳☠️" && \
    ls -la node_modules/@prisma && \
    ls -la src/generated/prisma

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/main.js"]

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
