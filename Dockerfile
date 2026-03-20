FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG APP_NAME

RUN npx prisma generate
RUN npm run build -- ${APP_NAME}

RUN npm prune --production

FROM node:20-alpine3.23

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/src/${APP_NAME} ./dist/${APP_NAME}
COPY --from=builder /usr/src/app/prisma ./prisma

COPY package*.json ./
RUN npm install --production

EXPOSE 3000

CMD ["sh", "-c", "node dist/${APP_NAME}/main.js"]