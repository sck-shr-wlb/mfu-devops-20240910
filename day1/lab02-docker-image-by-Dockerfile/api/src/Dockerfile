# -------------- The build image --------------
FROM node:20.17.0-bookworm AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production

# -------------- The production image --------------
FROM node:20.17.0-bookworm-slim

ENV NODE_ENV=production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
EXPOSE 3000
CMD ["node", "index.js"]