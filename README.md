#client for animals_app React JSX

Backend
In order to use the app, please clone this simple backend app - https://github.com/naut92/animals_app Fire-up the server and then continue with setting-up the frontend app

Setup:

$ yarn install

Run on port 3000: 

$ yarn start

image only:

docker build -t animals-app-client .

kubernetes:

kubectl create -f frontend.yml