FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install && \
    npm cache clean --force && \
    rm -rf /root/.npm
COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]