
## Build service
FROM node:lts-slim AS build

ENV NODE_ENV="production"

WORKDIR /app
COPY . .
RUN yarn install --immutable 
RUN yarn build


## Build vendor
FROM node:lts-slim

RUN apt-get update && apt-get install -y glyrc && apt-get clean && rm -rf /var/lib/apt

WORKDIR /app

COPY --from=build /root/.yarn/berry/cache/ /root/.yarn/berry/cache/
COPY --from=build /app/.pnp.cjs ./
COPY --from=build /app/.yarn .yarn/
COPY --from=build /app/dist ./

ENV NODE_ENV="production"

VOLUME [ "/music" ]

USER root

CMD ["node", "-r", "./.pnp.cjs", "index.js"]