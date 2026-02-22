# Use official Nginx image
FROM nginx:alpine

# Copy your web assets into Nginx's default directory
COPY ./index.html /usr/share/nginx/html/
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js
COPY ./images /usr/share/nginx/html/images

# Expose port 80 inside the container
EXPOSE 80

