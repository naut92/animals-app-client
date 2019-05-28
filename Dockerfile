#FROM mhart/alpine-node:11 AS builder
#WORKDIR /app
#COPY . .
#RUN yarn run build

#FROM mhart/alpine-node
#RUN yarn global add serve
#WORKDIR /app
#COPY --from=builder /app/build .
#CMD ["serve", "-p", "3002", "-s", "."]


#команда запуска
# без ngnx: docker run -p 3000:80 animals-app-client


#создать изображение:
#1. yarn build
#2. docker build -t frontend/animals-app-client .

#только для запуска в среде docker:
#3. docker run -d -p 80:80 frontend/animals-app-client

FROM nginx
COPY build /usr/share/nginx/html
