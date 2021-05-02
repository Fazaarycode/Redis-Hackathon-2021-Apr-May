// const { promisify } = require('util');
const Redis = require('ioredis')
const INDEX = 'sightings:index'
const redisClient = require('../../redisClient/connection');

class SightingsData {
  async init() {
    console.log('URL '+ process.env.REDIS_URL)

    this.connection = new Redis(process.env.REDIS_URL)

    let indices = await this.connection.call('FT._LIST')

    if (indices.includes(INDEX)) {
      await this.connection.call('FT.DROPINDEX', INDEX)
    }

    await this.connection.call(
      'FT.CREATE', INDEX,
      'ON', 'hash',
      'PREFIX', 1, 'sighting:',
      'SCHEMA',
      'title', 'TEXT',
      'observed', 'TEXT',
      'location_details', 'TEXT',
      'location', 'GEO',
      'county', 'TAG',
      'state', 'TAG'
    )
    console.log('done init')
    console.log(await this.findById(2))
  }

  async findById(id) {
    return await this.connection.hgetall(`sighting:${id}`)
  }

  async findByState(state) {
    return await this.find(`@state:{${state}}`)
  }

  async findByCountyState(county, state) {
    return await this.find(`@county:{${county}} @state:{${state}}`)
  }

  async findContaining(text) {
    return await this.find(text)
  }

  async findByStateContaining(state, text) {
    return await this.find(`${text} @state:{${state}}`)
  }

  async findNear(latitude, longitude, radius, units) {
    return await this.find(`@location:[${longitude} ${latitude} ${radius} ${units}]`)
  }

  async find(query) {
    let [count, ...foundKeysAndSightings] = await this.connection.call('FT.SEARCH', INDEX, query, 'LIMIT', 0, 100)
    console.log('count  ??', foundKeysAndSightings)
    let foundSightings = foundKeysAndSightings.filter((entry, index) => index % 2 !== 0)
    let sightings = foundSightings.map(sightingArray => {
      let keys = sightingArray.filter((_, index) => index % 2 === 0)
      let values = sightingArray.filter((_, index) => index % 2 !== 0)
      return keys.reduce((sighting, key, index) => {
        sighting[key] = values[index]
        return sighting
      }, {})
    })
    return { count, sightings }
  }
}

module.exports = SightingsData;