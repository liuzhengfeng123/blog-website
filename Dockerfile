FROM node:alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS final-stage
COPY --from=build-stage /app/dist /data/dist
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443