FROM node:9

# Import the project into container's /app directory
ADD . /app
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Install the dependencies
RUN ["npm", "install"]

# Start the server on port 3000
ENTRYPOINT ["npm", "start"]
