FROM node

WORKDIR /customers-api

COPY package*.json ./

RUN npm install

COPY  . .

EXPOSE 4040

CMD ["node","index.js"]