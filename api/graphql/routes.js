var pg = require('pg');
var url = require('url');
var gql = require('graphql');
var gqlExp = require('express-graphql');

//Creates a thread pool of 10 threads for R/W access to the Postgres DB
var config;
if (process.env.DATABASE_URL) {
    let params = url.parse(process.env.DATABASE_URL);
    let auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 1000
    };
} else {
    config = {
        max: 10,
        idleTimeoutMillis: 1000
    };
}

var pool = new pg.Pool(config);

pool.on('error', function(err, client) {
    console.log(err);
});

//There are like endpoints (called "function" in GraphQL) -- each let
//represent a certain endpoint. I split them into different files
//to keep organized. Now, adding endpoints is as easy as copy-pasting
//one endpoint, changing some code, and adding it to this routing file.
let getFestival = require('./festival/get.js');
let listFestivals = require('./festival/list.js');
let createFestival = require('./festival/create.js');
let deleteFestival = require('./festival/delete.js');

let createEvent = require('./festival/createEvent.js');

let getArtist = require('./artist/get.js');
let createArtist = require('./artist/create.js');
let artistSearch = require('./artist/search.js');

//"Queries" are GraphQL functions which will have NO effect
//on data in the database. This is similar to how GET requests
//are treated in a RESTful API.
let QueryType = new gql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        //We map key names to the GraphQL objects for our endpoints
        //I basically created a one-to-one correspondence here
        return {
            getFestival: getFestival,
            listFestivals: listFestivals,

            getArtist: getArtist,
            artistSearch: artistSearch
        }
    }
});

//"Mutations" are GraphQL functions which have WILL / COULD have
//an effect on the database. These are similar to how POST, PUT,
//DELETE, etc. requests are treated in a RESTful API.
let MutationType = new gql.GraphQLObjectType({
    name: 'Mutation',
    fields: function() {
        return {
            createFestival: createFestival,
            deleteFestival: deleteFestival,

            createEvent: createEvent,

            createArtist: createArtist
        }
    }
});

//Create the schema using the defined queries and mutations
let Schema = new gql.GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

//Route api endpoints
//Note: graphiql is a graphical interface for interacting with
//the GraphQL API. You should try it out!
//Ex)
/*
query {
    listFestivals {
        id, name, description,
        events {
            id, name, event_time,
            artist {
                id, name, description
            }
        }
    }
}
*/

//The awesome thing about GraphQL is that the client can specify exactly which fields to return.
//This shifts the responsibility of efficiency (as far as data transfer & parsing goes, not literal SQL queries)
//to the client. This is extremely userful because it means that client teams can work on making certain requests
//more efficient to fit their needs or give them whatever data they need. For example, try taking out "events {...}"
//from the above query and you'll see what I mean.

//I've implemented a few of GraphQL's features, but there are even more I would like to explore in the future.
module.exports = function(app) {
    app.use('/api/graphql', gqlExp({
        schema: Schema,
        context: pool
    }));

    app.use('/api/graphiql', gqlExp({
        schema: Schema,
        graphiql: true,
        context: pool
    }));
};