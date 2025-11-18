# Stage 1: Build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve build via Nginx (HTTP only - SSL handled by main nginx)
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
# Copy HTTP-only nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8085
CMD ["nginx", "-g", "daemon off;"]
