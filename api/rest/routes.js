var pg = require('pg');

var pool = new pg.Pool({
    host: process.env.DATABASE_URL,
    database: 'rootsnblues',
    max: 10,
    idleTimeoutMillis: 1000
});

pool.on('error', function(err, client) {
    console.log(err);
});

module.exports = function(app) {
    app.get('/api/rest/test', test);
};

function test(req, res) {
    pool.query('SELECT * FROM event', function(err, result) {
        if (err) {
            console.error(err);
            res.send("Error " + err);
        } else {
            res.json({
                result: result.rows
            });
        }
    });
}