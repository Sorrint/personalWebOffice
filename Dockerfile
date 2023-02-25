FROM node:16 as client

WORKDIR /webOffice/client
COPY . /webOffice/client/
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

