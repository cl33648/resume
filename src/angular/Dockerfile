# Base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build --prod

# Use NGINX as the base image
FROM nginx:alpine

# Copy the built files from the previous stage to the NGINX webroot directory
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Copy custom nginx config
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 8081
EXPOSE 8081

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
