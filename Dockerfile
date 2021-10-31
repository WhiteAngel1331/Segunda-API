FROM node

WORKDIR /docker/segunda-api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]