# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install your Node.js dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Build your Next.js app
RUN npm run build

# Expose the port your Next.js app listens on (adjust as needed)
EXPOSE 3000

# Start your Next.js app
CMD [ "npm", "start" ]
