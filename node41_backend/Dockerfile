FROM node:20

WORKDIR /home/node41

# node_modules

COPY package*.json .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate


COPY . .

EXPOSE 8080

# yarn prod
CMD ["yarn","prod"]

# CMD ["node","src/index.js"]
# node src/index.js

# yarn start
# CMD ["yarn","start"]


# docker build . -t img-node

# docker run -d -p 8080:8080 --name cons-node --network node-network img-node


# docker run -d -p 8080:8080 -p 8081:8080 --name cons-node-socket --network node-network -e DB_DATABASE=db_youtube -e DB_USER=root img-node

# docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 --network node-network --name node-mysql  mysql