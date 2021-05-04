/**
 * What this file aims to do?
 * Read the recently inserted CSV, acquire the headers and build a RediSearch Index DYNAMICALLY around it.
 * 
 * WIP !!!!!!!!!!!!!!! - Not in Use yet.
 */

const extractHeaders = require('../csvParsing/extractHeaders');
const initialiser = require('./initialiser');
module.exports = async (fileName) => { 
    let headers = [];
    headers = await extractHeaders('bfro_reports_geocoded.csv');

    // let index = fileName || 'bfro_reports_geocoded.csv';
    // extractHeaders(fileName);
    // console.log('HEADES TYPE' , (headers));

    // User advanced choices for Index selections or every column is indexed.
    let str = '';
   (headers || []).map(column => {
    //    str += `${column},`  + 'TEXT\n'
   })

   str = `'observed,'TEXT','location_details','TEXT'`
//    console.log('STR params ' , str)
//    initialiser('bfro_reports_geocoded.csv', str)
//    initialiser(fileName, str)

}