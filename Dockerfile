FROM node:latest
ENV NODE_ENV production
ENV STATION 25001811
WORKDIR /usr/src/app
RUN mkdir public
COPY ["./","./"]
RUN npm install -g browserify
RUN npm install -g typescript
RUN npm install --production --silent
RUN tsc 
RUN browserify client/main.js -o public/bundle.js
EXPOSE 8999
CMD node Server.js ${STATION}
