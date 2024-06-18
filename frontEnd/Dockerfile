FROM node:20.14-alpine
WORKDIR /frontEnd
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]