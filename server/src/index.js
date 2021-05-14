require('dotenv').config()
const express = require("express");
var cookieparser = require("cookie-parser");
const app = express();
const { login, registration, logout, totalDatasets, refreshRedisKeys } = require('./routes/index');
const uploader = require('./fileUploader/uploader');
const autocompleteResults = require('./routes/search/autocompleteResults')
const request = require('request-promise-native');
let appVersion = new Date().toISOString();
app.use(express.json()) // Body-parser

app.use(cookieparser())

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Routes
app.use(login);

app.use(registration);

app.use(logout);

app.use(uploader);

app.use(autocompleteResults);

app.use(totalDatasets);

app.use(refreshRedisKeys);

app.get('/', (req, res) => {
  return res.json(`Hello world, App version is:  ${appVersion}`);
});

const SERVERPORT = process.env.PORT || 4000;

app.listen(SERVERPORT, async () => {
  console.log("🟢 Node server started 🟢");
  // Creating a user.
  const res = await request.post(`http://localhost:4000/user-registration`, {
    body: { "userName": "123", "email": "user@runtimeterror.com", "companyName": "123", "password": "123", "confirmPassword": "123" },
    json: true,
  });
  console.log('User created for convenience :) ' , res);
});

// Setup Global error handling so our app continues to run
process
    .on('unhandledRejection', (reason, p) => {
        console.log(`Unhandled Promise Rejection ${reason}`);
    })
    .on('uncaughtException', err => {
      console.log(`Uncaught Exception ${err}`);
    });