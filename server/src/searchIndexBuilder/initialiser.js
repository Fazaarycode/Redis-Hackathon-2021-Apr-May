/**
 * Index initializer. WIP !!
 */

const Redis = require('ioredis')

module.exports = async (INDEX, args) => {
    
    let connection = new Redis(process.env.REDIS_URL);

    let indices = await connection.call('FT._LIST');

    if (indices.includes(INDEX)) {
        await this.connection.call('FT.DROPINDEX', INDEX)
    }

    // await connection.call('FT.CREATE', INDEX,'ON', 'hash', 'PREFIX', 1, INDEX+':', 'SCHEMA',
    // args
    // )


}