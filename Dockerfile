#Using pre-defined node base image
FROM node:10.0.0

WORKDIR /src

# Copy package.json. To take advantage of cached Docker layer
COPY package.json /src

# Install nodemon to restart server on changes and the express
# packages for routing and path
RUN npm install
RUN npm install nodemon knex bookshelf -g 

COPY . /src

# Expose web service
EXPOSE 8020

CMD [ "node", "server.js" ]
 