const express = require("express");
const axios = require("axios");
const app = express();
const { login, registration } = require('./routes/index');
const redisClient = require('./redisClient/connection');

let redsearch  = require('./redredisearch');

// const   
//   argv      = require('yargs')                                    // command line handling
//               .demand('connection')                               // require the 'connection' argument
//               .demand('query')                                    // the query we'll run against the indexed values
//               .argv;

  
redsearch.setClient(redisClient.client);


redsearch.confirmModule(function(err){ // make sure the Redis install has the RediSearch module
  if (err) throw err; // throw an error if not
  console.log('RediSearch found.');
 });

 redsearch.createSearch('pets', {}, function(err,search) {

  var strs = [];
  strs.push('Manny is a cat');
  strs.push('Luna is a cat');
  strs.push('Tobi is a ferret');
  strs.push('Loki is a ferret');
  strs.push('Jane is a ferret');
  strs.push('Jane is funny ferret');

  // index them

  strs.forEach(function(str, i){
    search.index(str, i);
  });

  // query

  search.query('funny ferry').end(function(err, ids){
    if (err) throw err;
    var res = ids.map(function(i){ return strs[i]; });
    console.log(res);
    res.forEach(function(str){
      console.log('    - %s', str);
    });
    console.log();
    process.exit();
  });
});


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