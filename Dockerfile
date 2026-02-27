# Use lightweight NGINX base image
FROM nginx:alpine

# Copy your static site files into NGINX's default web root
COPY ./ /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

