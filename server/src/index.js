const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const client = redis.createClient({
    port: 6379,
    host: 'redis',
    password: 'secret' // as given in docker-compose.yml file
});

client.on("error", (err) => {
    console.log(`💔💔 ${err}`);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("🟢 Node server started 🟢");
});