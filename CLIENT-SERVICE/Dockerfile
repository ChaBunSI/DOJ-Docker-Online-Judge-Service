FROM node:18.19.0-alpine

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]