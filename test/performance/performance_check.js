var fs = require("fs")
var flags = require('flags');

flags.defineString('median', 10, "Median threshold in ms");
flags.defineString('p99', 100, "P99 threshold in ms");

flags.parse();

var results = fs.readFileSync("./performance.results.json");
results = JSON.parse(results);

var exit = 0

if (results.aggregate.latency.median>flags.get('median')){
	console.error("ERR!! Median latency above threshold of %sms at: %sms",flags.get('median'), results.aggregate.latency.median)
	exit = 1
} else {
	console.log("Median latency below threshold of %sms at: %sms",flags.get('median'), results.aggregate.latency.median)
}

if (results.aggregate.latency.p99>flags.get('p99')){
	console.error("ERR!! p99 latency above threshold of %sms at: %sms",flags.get('p99'), results.aggregate.latency.p99)
	exit = 1
} else {
	console.log("p99 latency below threshold of %sms at: %sms",flags.get('p99'), results.aggregate.latency.p99)
}

process.exit(exit);