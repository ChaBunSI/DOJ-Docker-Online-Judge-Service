FROM node:18.19.0-alpine

WORKDIR /app
COPY . /app

RUN npm install

CMD ["npm", "run", "dev"]