# use docker to start up the service with all dependencies
# docker-compose up -d 

# run artillery tests to fire multiple requests
npm install -g artillery
artillery run $PWD/test/performance/performance.spec.yaml -o performance.results.json

# TODO: inspect the results and decide whether to pass or fail
node $PWD/test/performance/performance_check.js --median 25 --p99 100

# tear down
# docker-compose down
exit 0