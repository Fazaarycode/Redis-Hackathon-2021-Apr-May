// This is used to extract headers off of currently computing CSV file.
// We then form search indexes using this headers list = Faster search.

const csv = require('csv-parser')
const fs = require('fs')

module.exports = () => {

    fs.createReadStream('datasource/bfro_reports_geocoded.csv')
        .pipe(csv())
        .on('headers', (headers) => {
            console.log(`First header: ${headers}`)
            return headers;
            /**
             * observed,location_details,county,state,title,latitude,longitude,date,number,classification,geohash,temperature_high,temperature_mid,temperature_low,dew_point,humidity,cloud_cover,moon_phase,precip_intensity,precip_probability,precip_type,pressure,summary,uv_index,visibility,wind_bearing,wind_speed
             */
        })

}
