FROM node:latest
LABEL authors="Pedro"
RUN mkdir -p /usr/src/app
WORKDIR /app
COPY ["package.json", "/app"]
COPY . .
ENV PORT=3000
RUN npm install
EXPOSE $PORT
CMD ["npm", "start"]

# Node server
# FROM node:12-alpine as node-server
# WORKDIR /usr/src/app
# COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY server.js .
# COPY /server /usr/src/app/server

# Final image
# FROM node:12-alpine
# WORKDIR /usr/src/app
# COPY --from=node-server /usr/src /usr/src
# COPY --from=client-app /usr/src/app/dist ./
# EXPOSE 3000
# CMD ["node", "server.js"]
# CMD ["npm", "start"]
