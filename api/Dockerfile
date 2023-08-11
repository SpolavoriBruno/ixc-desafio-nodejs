FROM node:lts-bookworm-slim

WORKDIR /app
COPY package*.json .

RUN npm install --omit=dev

COPY . .

CMD [ "node", "bin/api" ]
