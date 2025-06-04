# Use Node base image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the backend port
EXPOSE 3001

# Start the server
CMD [ "node", "src/index.js" ]
