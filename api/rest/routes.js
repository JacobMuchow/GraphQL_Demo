var pg = require('pg');

module.exports = function(app) {
    app.get('/api/rest/test', test);
};

function test(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err) {
                console.error(err);
                res.send("Error " + err);
            } else {
                res.json({
                    result: result.rows
                });
            }
        });
    });
}