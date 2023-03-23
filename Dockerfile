FROM node:lts-alpine
RUN apk add yarn
WORKDIR /usr/src/app


COPY ["package.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile

# Source
COPY . .

# RUN ["chmod", "+x", "wait-for-it.sh"]
CMD yarn start:dev