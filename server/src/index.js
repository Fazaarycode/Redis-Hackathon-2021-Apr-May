const express = require("express");
const axios = require("axios");
// const redis = require("redis");
const app = express();
const { login, registration } = require('./routes/index');
const redisClient = require('./redisClient/connection');

app.use(express.json())

// Routes
app.use(login);

app.use(registration);

app.get('/store/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});

app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
});

app.get('/', (req, res) => {
    return res.send('Hello world');
});

const SERVERPORT = process.env.PORT || 3000;

app.listen(SERVERPORT, () => {
    console.log("🟢 Node server started 🟢");
});