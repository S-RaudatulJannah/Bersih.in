# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder
# Enable Corepack and set Yarn if needed, but we use npm here
WORKDIR /app
COPY package.json package-lock.json* ./
# Install all dependencies (termasuk devDependencies u/ build)
RUN npm install

COPY . .
# Update Prisma client
RUN npx prisma generate
# Build the Next.js app
RUN npm run build

# Stage 2: Production execution environment
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Running Next.js in production natively
CMD ["npm", "start"]