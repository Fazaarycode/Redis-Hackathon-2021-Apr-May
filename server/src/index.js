const express = require("express");
const axios = require("axios");
const app = express();
const { login, registration } = require('./routes/index');
const redisClient = require('./redisClient/connection');
const SightingData = require('./routes/search/searchFunctions') 
const load = require('./routes/search/loadData');
let sightingData = new SightingData()
sightingData.init()

load();

app.use(express.json())

// Routes
app.use(login);

app.use(registration);

app.get('/sighting/:id', async (req, res) => {
  console.log('Here!')
  res.send(await sightingData.findById(req.params.id))
})

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

app.get('/sightings/state/:state/containing/:text', async (req, res) => {
  res.send(await sightingData.findByStateContaining(req.params.state, req.params.text))
})

app.get('/sightings/state/:state', async (req, res) => {
  res.send(await sightingData.findByState(req.params.state))
})

app.get('/', (req, res) => {
    return res.send('Hello world');
});

const SERVERPORT = process.env.PORT || 3000;

app.listen(SERVERPORT, () => {
    console.log("🟢 Node server started 🟢");
});