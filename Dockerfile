# Dockerfile
FROM node:5

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

EXPOSE 5000

# defined in package.json
CMD [ "npm", "start" ]
