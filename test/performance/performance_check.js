var fs = require("fs");
var flags = require("flags");

flags.defineString("median", 10, "Median threshold in ms");
flags.defineString("p95", 95, "p95 threshold in ms");
flags.defineString("p99", 100, "p99 threshold in ms");
flags.defineString("rps", 50, "Mean requests per seconds required");

flags.parse();

var results = fs.readFileSync("./performance.results.json");
results = JSON.parse(results);

var exit = 0;

if (results.aggregate.latency.median>flags.get("median")){
	console.error("ERR!! Median latency above threshold of %sms at: %sms",flags.get("median"), results.aggregate.latency.median);
	exit = 1;
} else {
	console.info("Median latency below threshold of %sms at: %sms",flags.get("median"), results.aggregate.latency.median);
}

if (results.aggregate.latency.p95>flags.get("p95")){
	console.error("ERR!! p95 latency above threshold of %sms at: %sms",flags.get("p95"), results.aggregate.latency.p95);
	exit = 1;
} else {
	console.info("p95 latency below threshold of %sms at: %sms",flags.get("p95"), results.aggregate.latency.p95);
}

if (results.aggregate.latency.p99>flags.get("p99")){
	console.error("ERR!! p99 latency above threshold of %sms at: %sms",flags.get("p99"), results.aggregate.latency.p99);
	exit = 1;
} else {
	console.info("p99 latency below threshold of %sms at: %sms",flags.get("p99"), results.aggregate.latency.p99);
}

if (results.aggregate.rps.mean<flags.get("rps")){
	console.error("ERR!! rps below threshold of %s at: %s", flags.get("rps"), results.aggregate.rps.mean);
	exit = 1;
} else {
	console.info("rps above threshold of %s at: %s", flags.get("rps"), results.aggregate.rps.mean);
}

process.exit(exit);