# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build
RUN npm prune --omit=dev

# Stage 2: Production
FROM node:20-slim AS production

RUN apt-get update && apt-get install -y libvips-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/favicon.png ./favicon.png
COPY --from=build /app/src ./src
COPY --from=build /app/database ./database
COPY --from=build /app/package.json ./package.json

EXPOSE 1337

CMD ["npm", "run", "start"]
