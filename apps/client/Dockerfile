
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Add package files
COPY ./package.json ./pnpm-lock.yaml* ./

# Install dep with pnpm
RUN pnpm install

COPY . .

# Build app
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]