FROM node:current-buster-slim
WORKDIR /media/dpd-backend/app
VOLUME /media/dpd-backend/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD [ "npm", "start" ]
