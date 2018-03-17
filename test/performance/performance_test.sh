# use docker to start up the service with all dependencies
docker-compose -f $PWD/test/performance/docker-compose.yaml build
docker-compose -f $PWD/test/performance/docker-compose.yaml up -d 

# run artillery tests to fire multiple requests
npm install -g artillery@1.6.0-14
artillery run $PWD/test/performance/performance.spec.yaml -o performance.results.json

# TODO: inspect the results and decide whether to pass or fail
node $PWD/test/performance/performance_check.js --median 50 --p99 500

# tear down
docker-compose -f $PWD/test/performance/docker-compose.yaml down
exit 0
