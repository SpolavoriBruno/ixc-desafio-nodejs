#----------------Build Container----------------
FROM node:lts-bookworm-slim AS build

WORKDIR /app

COPY package*.json .

# Install production dependencies
RUN npm install --omit=dev

COPY . .

# Build App
RUN node node_modules/.bin/react-scripts build

#----------------Webserver Container----------------
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove Nginx defaults
RUN rm -rf ./*

# Forward all routes to Rect App
RUN sed -i 's/index  index.html index.htm;/try_files $uri \/index.html;/g' /etc/nginx/conf.d/default.conf

# Copy builded app from build container
COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
