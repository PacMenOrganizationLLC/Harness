FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 

ARG REACT_APP_API_URL=http://pacmen-harness-api:8080
ARG REACT_APP_AUTHORITY=https://harnesskc.duckdns.org:25651/realms/harness
ARG REACT_APP_CLIENT_ID=harness

ENV REACT_APP_SSO_URL=$REACT_APP_API_URL
ENV REACT_APP_AUTHORITY=$REACT_APP_AUTHORITY
ENV REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID

COPY . .
RUN npm run build

FROM nginx
RUN apt update && apt install -y curl
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
CMD ["nginx", "-g", "daemon off;"]