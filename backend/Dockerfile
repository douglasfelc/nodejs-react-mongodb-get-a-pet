FROM node:16.17-alpine3.15

#Pasta de trabalho
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

#Copiar os arquivos da minha máquina UBUNTU para o WORKDIR do container
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]