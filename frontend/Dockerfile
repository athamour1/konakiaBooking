# Stage 1: Build the Quasar SPA
FROM node:18 as build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the entire application
COPY . .

# Build the Quasar SPA
RUN yarn build

# Stage 2: Serve the built Quasar SPA using a lightweight web server
FROM nginx:latest as production-stage

# Copy the built Quasar SPA from the previous stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
