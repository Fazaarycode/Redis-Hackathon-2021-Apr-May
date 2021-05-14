// Endpoints imports 
module.exports = {
    login: require('./userLogin.js'),
    registration: require('./userRegistration.js'),
    logout: require('./auth/userLogout'),
    totalDatasets: require('./TotalDatasets'),
}

