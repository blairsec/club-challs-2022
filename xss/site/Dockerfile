FROM node:18

WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm ci

COPY . /app/

ARG PORT=8080
ENV PORT=${PORT}
ARG FLAGS
ENV FLAGS=${FLAGS}
ARG RECAPTCHA_KEYS
ENV RECAPTCHA_KEYS=${RECAPTCHA_KEYS}
ARG LB_HOST=load_balancer
ENV LB_HOST=${LB_HOST}
ARG LB_PORT=8081
ENV LB_PORT=${LB_PORT}
ARG SELF_LOC=http://127.0.0.1:8080/
ENV SELF_LOC=${SELF_LOC}
ARG EXPIRATION_TIME=86400000
ENV EXPIRATION_TIME=${EXPIRATION_TIME}
EXPOSE ${PORT}

CMD ["node", "index.js"]