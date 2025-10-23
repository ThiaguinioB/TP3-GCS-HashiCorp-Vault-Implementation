FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application files
COPY server.js .
COPY public/ ./public/

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden)
ENV VAULT_ADDR=http://vault:8200
ENV VAULT_TOKEN=dev-token

# Start the application
CMD ["npm", "start"]
