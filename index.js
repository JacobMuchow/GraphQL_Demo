var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = { 
    hello: () => {
        return 'Hello world!';
    }
};

var app = express();
app.set('port', (4000));

//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});