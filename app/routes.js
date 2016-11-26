module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/views/event_card', function(req, res) {
        
        if ('event' in req.query) {
            var event = JSON.parse(req.query.event);

            res.render('views/event_card', { event: event });
        }

        //TODO: Handle error
    });
};