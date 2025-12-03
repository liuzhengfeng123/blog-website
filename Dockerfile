FROM node:alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM nginx AS final-stage
COPY --from=build-stage /app/dist /data/dist
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443