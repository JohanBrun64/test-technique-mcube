FROM node:20.14-alpine
WORKDIR /backEnd
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]
