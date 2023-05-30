FROM node:14-alpine

WORKDIR /src ./
COPY package*.json ./

RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]