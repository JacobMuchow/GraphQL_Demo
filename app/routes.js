//Create routes for application
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/festival', function(req, res) {
        res.render('festival', {
            festivalId: req.query.id
        });
    });

    app.get('/festival/create', function(req, res) {
        res.render('createFestival');
    });

    app.get('/event/create', function(req, res) {
        res.render('createEvent', {
            festivalId: req.query.id
        });
    });

    app.get('/views/festival_card', function(req, res) {
        res.render('views/festival_card', {
            festival: JSON.parse(req.query.festival)
        });
    });

    app.get('/views/event_card', function(req, res) {
        res.render('views/event_card', {
            event: JSON.parse(req.query.event)
        });
    });
};