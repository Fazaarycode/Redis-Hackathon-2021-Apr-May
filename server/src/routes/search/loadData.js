module.exports = () => {
const csv = require('csv-parser')
const Redis = require( 'ioredis')

const fs = require('fs')
console.log(process.env)

let r = new Redis('redis://cache')

 let p = r.pipeline()

 fs.createReadStream('datasource/bfro_reports_geocoded.csv')
  .pipe(csv())
  .on('data', data => {
    let { number, title, date, observed, classification, county, state, latitude, longitude, location_details } = data

    let id = parseInt(number)
    title = title.replace(/^Report \d*: /, '')
    county = county.replace(/ County$/, '')
    let location = (longitude && latitude) ? `${longitude},${latitude}` : ''
    let key = `sighting:${id}`
    let values = { id, title, date, observed, classification, county, state, location, location_details }
    // console.log(`Command p.hset(${key}, ${values})`)
    p.hset(key, values)
  })
  .on('end', () => {
    p.exec();
    r.quit()
  })

};