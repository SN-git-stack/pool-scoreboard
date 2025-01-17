# Use an official Nginx image as the base
FROM nginx:alpine
# Set working directory inside container
WORKDIR /usr/share/nginx/html
# Copy application files into the container
COPY . .
# Expose port 80 (HTTP) - adjust this if needed
EXPOSE 80
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]