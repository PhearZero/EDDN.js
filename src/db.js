/**
 * Created by phear on 4/30/15.
 */
var influx = require('influx');
module.exports = influx({
    host: 'localhost',
    port: 8086,
    username: 'root',
    password: 'root',
    database: 'EDDN'
});