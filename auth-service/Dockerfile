FROM node:alpine

WORKDIR /server

COPY ./package.json .

COPY ./tsconfig.json .

COPY ./jest.config.js .

COPY ./babel.config.js .

COPY ./src ./server/

RUN npm install

CMD ["npm" , "run" , "start"]