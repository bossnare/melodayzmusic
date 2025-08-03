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

FROM node:lts-alpine AS dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

FROM dependencies AS generate
COPY prisma ./prisma
RUN npx prisma generate

FROM generate AS build
COPY . .
RUN pnpm build

FROM node:lts-alpine AS runtime
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
EXPOSE 5000
CMD ["node", "dist/main"]
