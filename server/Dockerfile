# Stage 1: Build stage using a lightweight Node.js version with NCC
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Install NCC locally to bundle the application
RUN npm install @vercel/ncc --save-dev

# Copy the rest of the application code, including the src folder and server.js
COPY . .

# Build the application into a single file using NCC, the output will be index.js by default
RUN npx ncc build server.js -o dist

# Stage 2: Final image with a minimal Node.js runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the bundled application from the builder stage
COPY --from=builder /app/dist/index.js .

# Copy package.json if it's required by the app in runtime
COPY --from=builder /app/package.json .

# Create a minimal package.json with "type": "module" if needed to enable ES module support
RUN echo '{ "type": "module" }' > package.json

# Expose the port if necessary (optional)
EXPOSE 3000

# Start the bundled application, running the ES module
CMD ["node", "index.js"]
