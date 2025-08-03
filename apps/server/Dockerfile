# direct: Stage Prod
FROM node:20-alpine

# RUN corepack enable && corepack prepare pnpm@latest --activate
# ----- Bun installation ------
RUN apk update && apk add --no-cache curl bash git && \
    curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    ln -s "$BUN_INSTALL/bin/bun" /usr/local/bin/bun && \
    bun --version

# --- Create app directory
WORKDIR /app

# COPY lock file and deps descriptor before
COPY bun.lock package.json ./

# Install deps (cached)
RUN bun install && \
    echo "Bun dependencies installed successfully. ✅"

# if installation passed, COPY all source code
COPY . .

# Prisma generate before
RUN bunx prisma generate && \
    echo 'Prisma generated successfully. ✅'

# Build app
RUN bun run build

# just declare it
EXPOSE 5000

# Run app
CMD ["node", "dist/main"]

# --------------- WITH pnpm ----------------

# Add package files
# COPY ./package.json ./pnpm-lock.yaml* ./

# Install dep with pnpm
# RUN pnpm install

# COPY . .

# Build app
# RUN pnpm build