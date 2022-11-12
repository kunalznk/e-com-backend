FROM node:alpine

WORKDIR /server

COPY ./package.json .

COPY ./tsconfig.json .

RUN npm install

RUN npm run test

RUN npm run build

COPY /dist .

CMD ["npm" , "run" , "start"]