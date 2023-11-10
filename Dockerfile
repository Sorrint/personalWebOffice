FROM node:16 as client

WORKDIR /office

COPY *.json /office/

RUN npm install -g npm@9.7.2
RUN npm install
COPY . /office/

EXPOSE 5000

CMD [ "npm", "run", "build" ]

