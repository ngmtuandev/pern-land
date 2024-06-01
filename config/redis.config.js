const redis = require("redis");

let client = redis.createClient();
client.on("error", (er) => console.log("Redis error !!", er));

// (async () => {
//     await client.connect();
// })()

const fnConnectRedis = async () => {
  await client.connect();
  console.log("Redis connected successfully");
};

fnConnectRedis();

module.exports = client;
