var express = require('express');
var router = express.Router();
const destroyJWT = require('./jwt/destroyJWT');

module.exports = router.post('/user-logout', async function (req, res) {
    try {
        // console.log()
        // Login use case doesn't require us setting us to Redis Cache.
        await destroyJWT(req.cookies.jwt);
        const cookieBaseOptions = { httpOnly: false, secure: false };
      
        res.clearCookie('jwt', { ...cookieBaseOptions, domain: req.hostname, sameSite: 'strict' });
        res.clearCookie('jwt', cookieBaseOptions); // legacy cookie logout for now
        res.send({ success: true });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});