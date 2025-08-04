# --------------- WITH Bun ----------------

# STAGE 1: Install dependencies and generate prisma
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN echo "Jereo ilay prisma �🔥🔥�🏻‍♂️" && \
    ls -la node_modules/@prisma

RUN npx prisma generate

CMD ["node", "dist/main"]

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
