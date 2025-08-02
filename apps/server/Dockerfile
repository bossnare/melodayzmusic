
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Add package files
COPY ./package.json ./pnpm-lock.yaml* bun.lock ./

# Install dep with pnpm
RUN pnpm install

COPY . .

# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Build app
RUN pnpm build

EXPOSE 3000

CMD ["node", "start:prod"]