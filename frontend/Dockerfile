# Use the official Node.js image from the Docker Hub
FROM node:20.16.0 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json /app/
COPY package-lock.json /app/

# Install the required dependencies
RUN npm install

# Copy the React application code
COPY . /app

# Build the React application
RUN npm run build

#실행
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
