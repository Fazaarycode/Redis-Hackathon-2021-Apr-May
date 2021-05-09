# Finding Bigfoot

This is just a quick and dirty document do get you up and running with this sample code. Follow these steps and you'll be finding Bigfoot in no time!

1. Install the latest version of Node.js. I used version 15.8. Better yet, install [Node Version Manager](https://github.com/nvm-sh/nvm) and issue the following command:

        $ nvm use

2. Install all the node packages:

        $ npm install

3. If don't have Docker, go and get it. Then, start up Redis with RediSearch:

        $ ./start-redis.sh

4. Load the Bigfoot data:

        $ npm run load

5. Launch the Bigfoot Data Service:

        $ npm start

6. Have fun finding Bigfoot with this handy URLs:

        $ curl http://localhost/sighting/1234
        $ curl http://localhost:3000/sightings/state/Ohio
        $ curl http://localhost/sightings/county/Athens/state/Ohio
        $ curl http://localhost:3000/sightings/containing/walmart
        $ curl http://localhost/sightings/near/lat/39.9612/long/-82.9988/within/50/mi
        $ curl http://localhost/sightings/near/lat/39.9612/long/-82.9988/within/50/km
        $ curl http://localhost:3000/sightings/state/California/containing/river

Thanks!
Guy
