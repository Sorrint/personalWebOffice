FROM node:18-alpine as client

WORKDIR /office

COPY *.json /office/

RUN npm install --no-update-notifier
COPY . /office/

EXPOSE 5000

CMD [ "npm", "run", "build" ]

