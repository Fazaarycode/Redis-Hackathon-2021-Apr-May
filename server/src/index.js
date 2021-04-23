const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();
const { login, registration } = require('./routes/index');
require('./redisClient/connection').connectToRedis();

app.use(express.json())

// Routes
app.use(login);

app.use(registration);

app.listen(process.env.PORT || 3000, () => {
    console.log("🟢 Node server started 🟢");
});