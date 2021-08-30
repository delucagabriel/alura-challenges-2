FROM node:14.15.5

WORKDIR /home/alura-challenges-2

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start:dev