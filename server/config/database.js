var config = require('../configuration.json')
module.exports = {
    'secret': config.APP_KEY,
    'database': config.DB_URL
}