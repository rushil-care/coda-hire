const mongoose = require("mongoose");
const keys = require("./keys");
const env = process.env.NODE_ENV;
const conf = keys.mongodb[env];

let connectionString;

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

switch (env) {
    case "local":
        connectionString = `mongodb://${conf.host}:${conf.port}/${conf.database}`;
        break;
    case "dev":
        connectionString = `mongodb://${conf[0].username}:${conf[0].password}@${conf[0].host}:${conf[0].port},${conf[0].host_1}:${conf[0].port_1},${conf[0].host_2}:${conf[0].port_2}/${conf[0].database}?ssl=true&replicaSet=${conf[0].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
        break;
    case "staging":
    case "preprod":
    case "prod":
        connectionString = `mongodb://${conf[0].username}:${conf[0].password}@${conf[0].host}:${conf[0].port},${conf[0].host_1}:${conf[0].port_1},${conf[0].host_2}:${conf[0].port_2}/${conf[0].database}?ssl=true&replicaSet=${conf[0].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
        break;
}
console.log(env);

var conn = mongoose.createConnection(connectionString);

module.exports = { conn };
