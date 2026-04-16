# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
# Install dependency 
RUN npm install

COPY . .

# Build aplikasi Next.js
RUN npm run build

# Stage 2: Production execution environment
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Hanya copy file yang dibutuhkan untuk menjalankan aplikasi
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Jalankan server bawaan Next.js
CMD ["npm", "start"]