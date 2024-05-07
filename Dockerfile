FROM node:18.16.1-bullseye-slim

WORKDIR /server

COPY package.json .
RUN npm install --omit=dev --ignore-scripts

COPY ./build .

EXPOSE 3001
CMD ["node", "index.js"]
