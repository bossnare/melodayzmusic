# direct: Stage Prod
FROM node:20-alpine

# RUN corepack enable && corepack prepare pnpm@latest --activate
# ----- Bun installation ------
RUN apk update && apk add --no-cache curl bash git && \
    curl -fsSL https://bun.sh/install | bash

# Add Bun in PATH
ENV PATH="/root/.bun/bin:$PATH"

# --- Create app directory
WORKDIR /app

# COPY lock file and deps descriptor before
COPY bun.lock package.json ./

# Install deps (cached)
RUN bun install

# if installation passed, COPY all source code
COPY . .

# Build app
RUN bun run build

EXPOSE 4000

CMD ["node", "dist/main"]

# --------------- WITH pnpm ----------------

# Add package files
# COPY ./package.json ./pnpm-lock.yaml* ./

# Install dep with pnpm
# RUN pnpm install

# COPY . .

# Build app
# RUN pnpm build