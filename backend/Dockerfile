FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

# `npm start` generates the Swagger file and then starts the API.
CMD ["npm", "start"]
