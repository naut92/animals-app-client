FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "3002", "-s", "."]


# The Node version that we'll be running for our version of React.
# You may have to search the Node directory for a version that fits
# the version of React you're using.
#FROM node:10.15-alpine

# Create a work directory and copy over our dependency manifest files.
#RUN mkdir /app
#WORKDIR /app
#COPY /src /app/src
#COPY ["package.json", "package-lock.json*", "./"]

# If you're using yarn:
#RUN yarn install --production --silent && mv node_modules ../

# Expose PORT 3000 on our virtual machine so we can run our server
#EXPOSE 3000