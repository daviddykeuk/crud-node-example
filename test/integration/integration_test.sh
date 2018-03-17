# use docker to start up the service with all dependencies
docker-compose up -d

# run mocha tests to call http endpoints
mocha ../acceptance/*.spec.js