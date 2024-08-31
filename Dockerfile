FROM node:20.17.0
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm install -g ts-node typescript
EXPOSE 3000
CMD ["npm", "run", "dev"]