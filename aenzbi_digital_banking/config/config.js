require('dotenv').config();

module.exports = {
    apiKey: process.env.API_KEY,
    sharedSecret: process.env.SHARED_SECRET,
};
