# FROM node:14.18.2-alpine3.14

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./

# RUN npm i

# EXPOSE 3000

# CMD ["npm", "start"]

# Stage 1
FROM node:16.18.0 as build-stage

WORKDIR /src
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage ./build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'