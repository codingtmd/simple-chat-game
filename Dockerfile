FROM node:18

RUN npm i --force

EXPOSE 8080

CMD node server/app.js