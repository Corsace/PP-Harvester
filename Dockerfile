FROM node:16-alpine

WORKDIR /src

COPY LICENSE package.json package-lock.json README.md tsconfig.json ormconfig.ts /src/

RUN npm ci

COPY Models/ /src/Models/
COPY Server/ /src/Server/
COPY Typing/ /src/Typing/
COPY config/ /src/config/

RUN npm run build

ENV NODE_ENV=production
RUN npm prune --production

ENTRYPOINT ["npm", "run"]
