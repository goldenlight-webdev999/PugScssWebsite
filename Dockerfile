FROM --platform=amd64 node:latest

ENV APP_PORT 3000
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app

COPY gulp /app/
# COPY CHANGELOG.md /app/
# COPY README.md /app/
COPY npm-shrinkwrap.json /app/
# COPY yarn.lock /app/
# COPY Dockerfile /app/
COPY package.json /app/
# COPY LICENSE /app/
COPY gulpfile.babel.js /app/
COPY src /app/
RUN npm install

EXPOSE ${APP_PORT}
CMD [ "npm", "start:${NODE_ENV}" ]
