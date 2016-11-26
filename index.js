var express = require('express');

var app = express();

// views is directory for all template files
app.set('port', (process.env.PORT || 4000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Client-side modules
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

require ('./api/rest/routes.js')(app);
require ('./api/graphql/routes.js')(app);

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});