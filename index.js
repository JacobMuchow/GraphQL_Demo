var express = require('express');

var app = express();

//Set up app variables
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/app');
app.set('view engine', 'ejs');

//Client-side modules
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/js', express.static(__dirname + '/app/js'));

//Let each tier handle its own routes
require ('./api/graphql/routes.js')(app);
require ('./app/routes.js')(app);

//Start listening on port (local is 5000)
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});