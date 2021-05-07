require('dotenv').config()
const express = require("express");
const axios = require("axios");
var cookieparser = require("cookie-parser");
const app = express();
const { login, registration } = require('./routes/index');
const redisClient = require('./redisClient/connection');
const SightingData = require('./routes/search/searchFunctions') 
const load = require('./routes/search/loadData');
const uploader = require('./fileUploader/uploader');
const autocompleteSetter = require('./routes/search/autocompleteSetter')
const autocompleteResults = require('./routes/search/autocompleteResults')
const indexBuilder = require('./searchIndexBuilder/indexBuilder');
let sightingData = new SightingData()

sightingData.init()



app.use(express.json()) // Body-parser

app.use(cookieparser())

// Routes
app.use(login);

app.use(registration);

app.use(uploader);

app.use(autocompleteSetter);

app.use(autocompleteResults);

// app.use(indexBuilder)
indexBuilder();

// signJWT();

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

// load();

// Here is where we load data.

app.get('/load', (req,res) => {
  // if(req.query.dataset === '') {
    load();
  // }
})

// -------------


  // ---------------

const SERVERPORT = process.env.PORT || 3000;

app.listen(SERVERPORT, () => {
    console.log("🟢 Node server started 🟢");
});


// Whats Pending?
/**
 * Dynamic construct data as per data source selected.
 *  - Which includes Search Index (✅) - For Single dataset - Not dynamic yet.
 *  - Create endpoint for Auto-complete  (✅)
 *  - Create endpoints for search (✅)
 *  - Use multer to upload DataCSV (✅)
 *  - Handle Tenant based search for different data sources
 *  - Use Frontend
 *  - Fix code structure
 */


// How
/**
 * Use csv-parser to extract headers
 */