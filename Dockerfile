FROM node:16 as client

WORKDIR /webOffice/client

COPY *.json /webOffice/client/

RUN npm install -g npm@9.7.2
RUN npm install
COPY . /webOffice/client/

EXPOSE 5000

CMD [ "npm", "run", "build" ]

