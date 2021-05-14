const helper = require('./autcompleteSetterHelper');
/**
 * This file has an endpoint that is used to add WORD-SUGGESTIONS to Redis using FT.SUGGET command.
 * 
 */


module.exports = async (fileName) => {
    try {
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        await helper(fileName);
        return { message: 'No errors, auto-completer done.' };
    }
    catch (err) {
        // res.statusCode(401)
        throw new Error({ message: `Failed to query due to ${err}` });
    }
}
