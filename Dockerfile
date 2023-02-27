FROM node:16 as client

WORKDIR /webOffice/client
COPY . /webOffice/client/
RUN npm install -g npm@9.5.1
RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "dev" ]

