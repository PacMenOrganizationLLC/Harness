FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 

ARG REACT_APP_API_URL=http://api.localhost

ENV REACT_APP_SSO_URL=$REACT_APP_API_URL

COPY . .
RUN npm run build

FROM nginx
RUN apt update && apt install -y curl
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
CMD ["nginx", "-g", "daemon off;"]